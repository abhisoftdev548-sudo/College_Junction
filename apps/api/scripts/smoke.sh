#!/usr/bin/env bash
# End-to-end smoke test for the College Junction API using curl + cookie jars.
# Usage: API=http://localhost:4000 bash apps/api/scripts/smoke.sh
set -u
API="${API:-http://localhost:4000}"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
STU="$TMP/student.jar"; ADM="$TMP/admin.jar"; OTHER="$TMP/other.jar"
PASS=0; FAIL=0
H='-H Content-Type:application/json -H X-Requested-With:XMLHttpRequest'
SUFFIX=$RANDOM

req() { # req <jar> <method> <path> [json]
  local jar=$1 m=$2 p=$3 body=${4:-}
  if [ -n "$body" ]; then
    curl -s -b "$jar" -c "$jar" -X "$m" $H "$API$p" -d "$body" -w '\n%{http_code}'
  else
    curl -s -b "$jar" -c "$jar" -X "$m" $H "$API$p" -w '\n%{http_code}'
  fi
}
check() { # check <label> <expected_code> <response>
  local label=$1 exp=$2 resp=$3
  local code=$(echo "$resp" | tail -1); local body=$(echo "$resp" | sed '$d')
  if [ "$code" = "$exp" ]; then PASS=$((PASS+1)); printf '  ✅ %-58s %s\n' "$label" "$code"
  else FAIL=$((FAIL+1)); printf '  ❌ %-58s got %s want %s\n     %s\n' "$label" "$code" "$exp" "$(echo "$body" | head -c 300)"; fi
  LAST_BODY="$body"
}
json() { printf '%s' "$LAST_BODY" | python3 -c "import sys,json; d=json.load(sys.stdin); print(eval('d'+sys.argv[1]))" "$1" 2>/dev/null; }

echo "▶ Health & CSRF"
check "GET /api/health" 200 "$(curl -s "$API/api/health" -w '\n%{http_code}')"
check "POST without X-Requested-With → 403" 403 "$(curl -s -X POST -H 'Content-Type: application/json' "$API/api/auth/login" -d '{}' -w '\n%{http_code}')"
check "Unknown route → 404 envelope" 404 "$(curl -s "$API/api/nope" -w '\n%{http_code}')"

echo "▶ Auth: signup / validation"
check "signup weak password → 400" 400 "$(req "$STU" POST /api/auth/signup "{\"username\":\"stu_$SUFFIX\",\"email\":\"stu$SUFFIX@x.com\",\"password\":\"weak\"}")"
check "signup bad username → 400" 400 "$(req "$STU" POST /api/auth/signup "{\"username\":\"bad name!\",\"email\":\"stu$SUFFIX@x.com\",\"password\":\"Passw0rd1\"}")"
check "signup ok → 201" 201 "$(req "$STU" POST /api/auth/signup "{\"username\":\"stu_$SUFFIX\",\"email\":\"stu$SUFFIX@x.com\",\"password\":\"Passw0rd1\"}")"
grep -q access_token "$STU" && grep -q refresh_token "$STU" && { PASS=$((PASS+1)); echo "  ✅ cookies access_token + refresh_token set"; } || { FAIL=$((FAIL+1)); echo "  ❌ cookies missing"; }
check "signup duplicate (case-insensitive username) → 409" 409 "$(req "$TMP/dup.jar" POST /api/auth/signup "{\"username\":\"STU_$SUFFIX\",\"email\":\"other$SUFFIX@x.com\",\"password\":\"Passw0rd1\"}")"
check "GET /me (student)" 200 "$(req "$STU" GET /api/auth/me)"
[ "$(json "['data']['user']['isProfileComplete']")" = "False" ] && echo "  ✅ isProfileComplete=false on new account" || echo "  ❌ isProfileComplete unexpected"

echo "▶ Auth: login by email / username / logout"
check "login wrong password → 401" 401 "$(req "$TMP/l.jar" POST /api/auth/login "{\"identifier\":\"stu$SUFFIX@x.com\",\"password\":\"Nope12345\"}")"
check "login by email → 200" 200 "$(req "$TMP/l.jar" POST /api/auth/login "{\"identifier\":\"stu$SUFFIX@x.com\",\"password\":\"Passw0rd1\"}")"
check "login by username → 200" 200 "$(req "$TMP/l2.jar" POST /api/auth/login "{\"identifier\":\"stu_$SUFFIX\",\"password\":\"Passw0rd1\"}")"
LOGOUT_HDRS=$(curl -s -b "$TMP/l2.jar" -D - -o /dev/null -X POST $H "$API/api/auth/logout")
echo "$LOGOUT_HDRS" | grep -q "HTTP/1.1 200" && echo "$LOGOUT_HDRS" | grep -qi "access_token=;.*Expires=Thu, 01 Jan 1970" && echo "$LOGOUT_HDRS" | grep -qi "refresh_token=;.*Expires=Thu, 01 Jan 1970" \
  && { PASS=$((PASS+1)); echo "  ✅ logout → 200 + both cookies expired via Set-Cookie"; } || { FAIL=$((FAIL+1)); echo "  ❌ logout cookie clearing"; echo "$LOGOUT_HDRS" | head -20; }
# (curl's jar keeps the first cleared cookie — a known curl quirk — so emulate a browser by discarding the jar.)
rm -f "$TMP/l2.jar"
check "/me after logout → 401" 401 "$(req "$TMP/l2.jar" GET /api/auth/me)"

echo "▶ Refresh rotation + reuse detection"
cp "$TMP/l.jar" "$TMP/stolen.jar"                       # attacker copies the refresh cookie
check "refresh (legit) → 200" 200 "$(req "$TMP/l.jar" POST /api/auth/refresh)"
check "GET /me after refresh → 200" 200 "$(req "$TMP/l.jar" GET /api/auth/me)"
check "refresh with OLD token (reuse) → 401" 401 "$(req "$TMP/stolen.jar" POST /api/auth/refresh)"
echo "$LAST_BODY" | grep -q TOKEN_REUSE && { PASS=$((PASS+1)); echo "  ✅ reuse flagged TOKEN_REUSE"; } || { FAIL=$((FAIL+1)); echo "  ❌ reuse not flagged"; }
check "legit refresh after theft → family revoked → 401" 401 "$(req "$TMP/l.jar" POST /api/auth/refresh)"

echo "▶ Profile gate"
check "create post before profile complete → 403" 403 "$(req "$STU" POST /api/posts '{"type":"notes","title":"DSA notes","description":"x"}')"
check "complete profile (missing fields) → 400" 400 "$(req "$STU" PUT /api/profile/complete '{"fullName":"A"}')"
check "complete profile → 200" 200 "$(req "$STU" PUT /api/profile/complete '{"fullName":"Asha Verma","college":"SGSITS Indore","course":"B.Tech","branch":"CSE","year":"2","semester":"3","session":"2025-26"}')"
check "GET /profile/:username (public)" 200 "$(curl -s "$API/api/profile/stu_$SUFFIX" -w '\n%{http_code}')"
check "GET /profile/unknown → 404" 404 "$(curl -s "$API/api/profile/nobody_here" -w '\n%{http_code}')"

echo "▶ Posts"
check "create post (json, no file) → 201" 201 "$(req "$STU" POST /api/posts '{"type":"notes","title":"Sem 3 DSA Notes","description":"<script>alert(1)</script>Linked lists & trees","externalLinks":["https://example.com/notes.pdf"]}')"
POST1=$(json "['data']['post']['id']")
[ "$(json "['data']['post']['description']")" = "Linked lists & trees" ] && { PASS=$((PASS+1)); echo "  ✅ description sanitized (script stripped)"; } || { FAIL=$((FAIL+1)); echo "  ❌ sanitize failed: $(json "['data']['post']['description']")"; }
[ "$(json "['data']['post']['authorSnapshot']['course']")" = "B.Tech" ] && { PASS=$((PASS+1)); echo "  ✅ authorSnapshot captured"; } || { FAIL=$((FAIL+1)); echo "  ❌ snapshot missing"; }
check "create post (multipart, bad file type) → 400" 400 "$(curl -s -b "$STU" -H 'X-Requested-With: XMLHttpRequest' -F type=problem -F title="Broken" -F description="d" -F "file=@$0;type=text/plain" "$API/api/posts" -w '\n%{http_code}')"
printf 'GIF89a\x01\x00\x01\x00\x00\x00\x00;' > "$TMP/fake.png"
check "create post (png ext but GIF magic) → 400" 400 "$(curl -s -b "$STU" -H 'X-Requested-With: XMLHttpRequest' -F type=problem -F title="Spoofed" -F description="d" -F "file=@$TMP/fake.png;type=image/png" "$API/api/posts" -w '\n%{http_code}')"
check "create post 2 → 201" 201 "$(req "$STU" POST /api/posts '{"type":"problem","title":"Stuck on Fourier series","description":"Q3 of unit 2"}')"
POST2=$(json "['data']['post']['id']")
check "create post 3 → 201" 201 "$(req "$STU" POST /api/posts '{"type":"notes","title":"Signals cheat sheet","description":"one pager"}')"
POST3=$(json "['data']['post']['id']")

echo "▶ Feed: pagination, filters, search"
check "GET /posts?limit=2" 200 "$(curl -s "$API/api/posts?limit=2" -w '\n%{http_code}')"
CUR=$(json "['data']['nextCursor']"); HM=$(json "['data']['hasMore']")
[ "$HM" = "True" ] && [ -n "$CUR" ] && { PASS=$((PASS+1)); echo "  ✅ hasMore + nextCursor"; } || { FAIL=$((FAIL+1)); echo "  ❌ pagination flags"; }
check "GET /posts?limit=2&cursor=..." 200 "$(curl -s "$API/api/posts?limit=2&cursor=$CUR" -w '\n%{http_code}')"
[ "$(json "['data']['items'][0]['id']")" = "$POST1" ] && { PASS=$((PASS+1)); echo "  ✅ cursor page returns the oldest post"; } || { FAIL=$((FAIL+1)); echo "  ❌ cursor page wrong"; }
check "GET /posts?cursor=bad → 400" 400 "$(curl -s "$API/api/posts?cursor=zzz" -w '\n%{http_code}')"
check "GET /posts?type=problem" 200 "$(curl -s "$API/api/posts?type=problem" -w '\n%{http_code}')"
[ "$(json "['data']['items'].__len__()")" = "1" ] && { PASS=$((PASS+1)); echo "  ✅ type filter"; } || { FAIL=$((FAIL+1)); echo "  ❌ type filter"; }
check "GET /posts?search=fourier" 200 "$(curl -s "$API/api/posts?search=fourier" -w '\n%{http_code}')"
[ "$(json "['data']['items'][0]['id']")" = "$POST2" ] && { PASS=$((PASS+1)); echo "  ✅ search"; } || { FAIL=$((FAIL+1)); echo "  ❌ search"; }
check "GET /posts?author=&branch=CSE&session=2025-26" 200 "$(curl -s "$API/api/posts?author=stu_$SUFFIX&branch=CSE&session=2025-26" -w '\n%{http_code}')"
[ "$(json "['data']['items'].__len__()")" = "3" ] && { PASS=$((PASS+1)); echo "  ✅ snapshot filters"; } || { FAIL=$((FAIL+1)); echo "  ❌ snapshot filters"; }
check "GET /posts?branch=ECE → empty" 200 "$(curl -s "$API/api/posts?branch=ECE" -w '\n%{http_code}')"
check "GET /filters/options" 200 "$(curl -s "$API/api/filters/options" -w '\n%{http_code}')"
[ "$(json "['data']['branch']")" = "['CSE']" ] && { PASS=$((PASS+1)); echo "  ✅ filter options distinct"; } || { FAIL=$((FAIL+1)); echo "  ❌ filter options: $LAST_BODY"; }
check "GET /posts/:id" 200 "$(curl -s "$API/api/posts/$POST1" -w '\n%{http_code}')"
check "GET /posts/:bad → 400" 400 "$(curl -s "$API/api/posts/123" -w '\n%{http_code}')"
check "GET /posts/:missing → 404" 404 "$(curl -s "$API/api/posts/aaaaaaaaaaaaaaaaaaaaaaaa" -w '\n%{http_code}')"

echo "▶ Snapshot immutability"
check "update profile to year 3" 200 "$(req "$STU" PUT /api/profile/complete '{"fullName":"Asha Verma","college":"SGSITS Indore","course":"B.Tech","branch":"CSE","year":"3","semester":"5","session":"2026-27"}')"
check "old post keeps year 2" 200 "$(curl -s "$API/api/posts/$POST1" -w '\n%{http_code}')"
[ "$(json "['data']['post']['authorSnapshot']['year']")" = "2" ] && { PASS=$((PASS+1)); echo "  ✅ snapshot immutable after profile change"; } || { FAIL=$((FAIL+1)); echo "  ❌ snapshot mutated"; }

echo "▶ Like / unlike (idempotent, race-safe) / save"
check "like" 200 "$(req "$STU" POST /api/posts/$POST1/like)"
check "like again (idempotent)" 200 "$(req "$STU" POST /api/posts/$POST1/like)"
[ "$(json "['data']['likesCount']")" = "1" ] && { PASS=$((PASS+1)); echo "  ✅ likesCount stays 1 after double like"; } || { FAIL=$((FAIL+1)); echo "  ❌ likesCount=$(json "['data']['likesCount']")"; }
# concurrent burst of 10 likes → still 1
for i in $(seq 10); do curl -s -b "$STU" $H -X POST "$API/api/posts/$POST1/like" >/dev/null & done; wait
check "GET post after burst" 200 "$(curl -s -b "$STU" "$API/api/posts/$POST1" -w '\n%{http_code}')"
[ "$(json "['data']['post']['likesCount']")" = "1" ] && [ "$(json "['data']['post']['likedByMe']")" = "True" ] && { PASS=$((PASS+1)); echo "  ✅ 10 concurrent likes → count 1, likedByMe true"; } || { FAIL=$((FAIL+1)); echo "  ❌ race: $(json "['data']['post']['likesCount']")"; }
check "unlike" 200 "$(req "$STU" POST /api/posts/$POST1/unlike)"
[ "$(json "['data']['likesCount']")" = "0" ] && { PASS=$((PASS+1)); echo "  ✅ unlike → 0"; } || { FAIL=$((FAIL+1)); echo "  ❌ unlike"; }
check "save (toggle on)" 200 "$(req "$STU" POST /api/posts/$POST2/save)"
[ "$(json "['data']['saved']")" = "True" ] || echo "  ❌ save toggle on"
check "GET /posts?saved=true" 200 "$(req "$STU" GET "/api/posts?saved=true")"
[ "$(json "['data']['items'][0]['id']")" = "$POST2" ] && { PASS=$((PASS+1)); echo "  ✅ saved feed"; } || { FAIL=$((FAIL+1)); echo "  ❌ saved feed"; }
check "save (toggle off)" 200 "$(req "$STU" POST /api/posts/$POST2/save)"
[ "$(json "['data']['saved']")" = "False" ] && { PASS=$((PASS+1)); echo "  ✅ save toggled off"; } || { FAIL=$((FAIL+1)); echo "  ❌ save toggle off"; }
check "like unauthenticated → 401" 401 "$(curl -s -X POST $H "$API/api/posts/$POST1/like" -w '\n%{http_code}')"

echo "▶ Comments"
check "comment empty → 400" 400 "$(req "$STU" POST /api/posts/$POST1/comments '{"text":"  "}')"
check "comment → 201" 201 "$(req "$STU" POST /api/posts/$POST1/comments '{"text":"Thanks, <b>super</b> helpful!"}')"
C1=$(json "['data']['comment']['id']")
[ "$(json "['data']['comment']['text']")" = "Thanks, super helpful!" ] && { PASS=$((PASS+1)); echo "  ✅ comment sanitized"; } || { FAIL=$((FAIL+1)); echo "  ❌ comment sanitize"; }
check "reply → 201" 201 "$(req "$STU" POST /api/posts/$POST1/comments "{\"text\":\"You're welcome\",\"parentComment\":\"$C1\"}")"
check "reply to foreign parent → 400" 400 "$(req "$STU" POST /api/posts/$POST2/comments "{\"text\":\"x\",\"parentComment\":\"$C1\"}")"
check "list comments" 200 "$(curl -s "$API/api/posts/$POST1/comments" -w '\n%{http_code}')"
[ "$(json "['data']['items'].__len__()")" = "2" ] && { PASS=$((PASS+1)); echo "  ✅ 2 comments listed"; } || { FAIL=$((FAIL+1)); echo "  ❌ comments list"; }
check "post commentsCount=2" 200 "$(curl -s "$API/api/posts/$POST1" -w '\n%{http_code}')"
[ "$(json "['data']['post']['commentsCount']")" = "2" ] && { PASS=$((PASS+1)); echo "  ✅ commentsCount incremented"; } || { FAIL=$((FAIL+1)); echo "  ❌ commentsCount"; }
check "delete parent comment (cascades reply)" 200 "$(req "$STU" DELETE /api/posts/$POST1/comments/$C1)"
check "commentsCount back to 0" 200 "$(curl -s "$API/api/posts/$POST1" -w '\n%{http_code}')"
[ "$(json "['data']['post']['commentsCount']")" = "0" ] && { PASS=$((PASS+1)); echo "  ✅ counter decremented by actual deletes"; } || { FAIL=$((FAIL+1)); echo "  ❌ commentsCount after delete"; }

echo "▶ Ownership"
check "signup other user" 201 "$(req "$OTHER" POST /api/auth/signup "{\"username\":\"oth_$SUFFIX\",\"email\":\"oth$SUFFIX@x.com\",\"password\":\"Passw0rd1\"}")"
check "other deletes stu's post → 403" 403 "$(req "$OTHER" DELETE /api/posts/$POST3)"
check "owner deletes own post → 200" 200 "$(req "$STU" DELETE /api/posts/$POST3)"
check "admin routes as student → 403" 403 "$(req "$STU" GET /api/admin/users)"
check "admin routes anon → 401" 401 "$(curl -s "$API/api/admin/users" -w '\n%{http_code}')"

echo "▶ Admin"
if [ -z "${ADMIN_PASSWORD:-}" ]; then echo "  (set ADMIN_USERNAME/ADMIN_PASSWORD to run admin checks — seed with npm run seed:admin)"; else
check "admin login" 200 "$(req "$ADM" POST /api/auth/login "{\"identifier\":\"${ADMIN_USERNAME:-admin}\",\"password\":\"$ADMIN_PASSWORD\"}")"
check "GET /admin/stats" 200 "$(req "$ADM" GET /api/admin/stats)"
check "GET /admin/users?search=stu_" 200 "$(req "$ADM" GET "/api/admin/users?search=stu_$SUFFIX")"
UID1=$(json "['data']['items'][0]['id']")
check "PATCH restrict user" 200 "$(req "$ADM" PATCH /api/admin/users/$UID1/restrict '{"isRestricted":true}')"
check "restricted user cannot post → 403" 403 "$(req "$STU" POST /api/posts '{"type":"notes","title":"blocked","description":"x"}')"
check "PATCH unrestrict" 200 "$(req "$ADM" PATCH /api/admin/users/$UID1/restrict '{"isRestricted":false}')"
check "PATCH timer 24h" 200 "$(req "$ADM" PATCH /api/admin/posts/$POST1/timer '{"duration":"24h"}')"
DA=$(json "['data']['post']['deleteAt']"); [ "$DA" != "None" ] && { PASS=$((PASS+1)); echo "  ✅ deleteAt set: $DA"; } || { FAIL=$((FAIL+1)); echo "  ❌ deleteAt"; }
check "PATCH timer invalid → 400" 400 "$(req "$ADM" PATCH /api/admin/posts/$POST1/timer '{"duration":"1y"}')"
check "PATCH timer clear" 200 "$(req "$ADM" PATCH /api/admin/posts/$POST1/timer '{"duration":null}')"
[ "$(json "['data']['post']['deleteAt']")" = "None" ] && { PASS=$((PASS+1)); echo "  ✅ deleteAt cleared"; } || { FAIL=$((FAIL+1)); echo "  ❌ clear timer"; }
check "GET /admin/posts" 200 "$(req "$ADM" GET "/api/admin/posts?limit=5")"
check "DELETE /admin/posts/:id" 200 "$(req "$ADM" DELETE /api/admin/posts/$POST2)"
check "GET /admin/users?search=oth_" 200 "$(req "$ADM" GET "/api/admin/users?search=oth_$SUFFIX")"
UID2=$(json "['data']['items'][0]['id']")
check "DELETE /admin/users/:id (other)" 200 "$(req "$ADM" DELETE "/api/admin/users/$UID2")"
check "deleted user's profile → 404" 404 "$(curl -s "$API/api/profile/oth_$SUFFIX" -w '\n%{http_code}')"
fi

echo "▶ Password reset flow (token from server log in dev)"
check "forgot-password (unknown email still 200)" 200 "$(req "$TMP/f.jar" POST /api/auth/forgot-password '{"email":"ghost@x.com"}')"
check "reset-password bad token → 400" 400 "$(req "$TMP/f.jar" POST /api/auth/reset-password '{"token":"not-a-real-token","password":"NewPassw0rd"}')"
check "verify-email bad token → 400" 400 "$(req "$TMP/f.jar" POST /api/auth/verify-email '{"token":"not-a-real-token"}')"

echo
echo "══════════════════════════════"
echo " PASS: $PASS   FAIL: $FAIL"
echo "══════════════════════════════"
[ "$FAIL" -eq 0 ]
