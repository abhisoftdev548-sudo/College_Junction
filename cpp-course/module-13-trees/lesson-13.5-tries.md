---
module: 13
topic: "13.5"
title: "Tries (Prefix Trees)"
slug: "tries"
difficulty: "Advanced"
prerequisites:
  - Binary Trees
  - Strings
  - Associative Containers
estimated_minutes: 30
tags:
  - dsa
  - trie
  - prefix-tree
---

# 13.5 Tries (Prefix Trees)

## Overview

A **trie** (pronounced "try") is a tree for storing **strings** where each node is a character and each root-to-node path spells a prefix. Tries turn "does this word exist?" and "find all words starting with…" into fast, prefix-based operations — the backbone of autocomplete, spell checkers, and IP routing.

## Learning Objectives

After this lesson you will be able to:

- Build a trie node and insert/search words
- Implement prefix search and count words with a prefix
- Delete a word from a trie
- List all words with a given prefix (autocomplete)
- Explain when a trie beats a hash set

## Core Concepts

### The node

```cpp
struct TrieNode {
    std::unordered_map<char, TrieNode*> children;
    bool isEnd = false;              // marks the end of a word
};
```

Each node holds a map of **child characters → child nodes** and a flag for "a word ends here."

### Insert

```cpp
void insert(TrieNode* root, const std::string& word) {
    TrieNode* cur = root;
    for (char c : word) {
        if (!cur->children.count(c)) {
            cur->children[c] = new TrieNode();
        }
        cur = cur->children[c];
    }
    cur->isEnd = true;               // word ends at this node
}
```

### Search

```cpp
bool search(TrieNode* root, const std::string& word) {
    TrieNode* cur = root;
    for (char c : word) {
        if (!cur->children.count(c)) return false;
        cur = cur->children[c];
    }
    return cur->isEnd;               // must be a full word, not just a prefix
}
```

### startsWith (prefix check)

```cpp
bool startsWith(TrieNode* root, const std::string& prefix) {
    TrieNode* cur = root;
    for (char c : prefix) {
        if (!cur->children.count(c)) return false;
        cur = cur->children[c];
    }
    return true;                     // the path exists
}
```

### Autocomplete (collect all words under a prefix)

```cpp
void collect(TrieNode* n, std::string prefix, std::vector<std::string>& out) {
    if (n->isEnd) out.push_back(prefix);
    for (auto& [c, child] : n->children) {
        collect(child, prefix + c, out);
    }
}
```

Walk to the prefix node, then DFS every child, accumulating words.

### Delete

```cpp
bool erase(TrieNode* n, const std::string& word, int i) {
    if (i == (int)word.size()) {          // reached the word's end
        if (!n->isEnd) return false;      // word not present
        n->isEnd = false;
        return n->children.empty();       // prune if no children remain
    }
    char c = word[i];
    if (!n->children.count(c)) return false;
    bool shouldPrune = erase(n->children[c], word, i + 1);
    if (shouldPrune) {
        delete n->children[c];
        n->children.erase(c);
    }
    return n->children.empty() && !n->isEnd;
}
```

## Visual — A Trie for {cat, car, do}

```
           (root)
          /      \
         c        d
        /          \
       a            o
      / \            \
     t   r           (end: "do")
   (end) (end)
   "cat"  "car"

  search("cat")  → c→a→t, isEnd ✓
  startsWith("ca") → c→a exists ✓
  autocomplete("ca") → ["cat", "car"]
```

Shared prefixes are stored once — that's the space and speed win over storing full strings.

## Code Examples

### Example 1 — Word dictionary

```cpp
#include <iostream>
#include <string>
#include <unordered_map>

int main() {
    TrieNode* root = new TrieNode();
    for (const std::string& w : {"cat", "car", "dog", "cart"}) insert(root, w);

    std::cout << search(root, "cat") << " ";        // 1
    std::cout << search(root, "ca") << " ";         // 0 (prefix, not word)
    std::cout << startsWith(root, "ca") << "\n";    // 1
}
```

### Example 2 — Count words with a prefix

```cpp
int countWords(TrieNode* n) {
    int count = n->isEnd ? 1 : 0;
    for (auto& [c, child] : n->children) count += countWords(child);
    return count;
}

int countWithPrefix(TrieNode* root, const std::string& prefix) {
    TrieNode* cur = root;
    for (char c : prefix) {
        if (!cur->children.count(c)) return 0;
        cur = cur->children[c];
    }
    return countWords(cur);   // all words under this node
}
```

### Example 3 — Autocomplete

```cpp
std::vector<std::string> autocomplete(TrieNode* root, const std::string& prefix) {
    TrieNode* cur = root;
    for (char c : prefix) {
        if (!cur->children.count(c)) return {};
        cur = cur->children[c];
    }
    std::vector<std::string> out;
    collect(cur, prefix, out);
    return out;
}
```

## Common Mistakes

1. **Forgetting `isEnd`** — a prefix path exists but isn't a word; `search` must check `isEnd`.
2. **`startsWith` vs `search`** — prefix check ignores `isEnd`; search requires it.
3. **Leaking nodes on delete** — free nodes and prune empty chains.
4. **Using a hash set instead of a trie for prefix queries** — sets can't answer "starts with" efficiently.
5. **Large fixed alphabets** — for 26 letters, an array `children[26]` is faster/simpler than a hash map.
6. **Case sensitivity** — normalize to lowercase if the domain needs it.

## Best Practices

- Use a trie when you need **prefix** operations (autocomplete, longest-prefix match).
- For lowercase letters, use a fixed 26-element array of children.
- Mark word ends with a boolean (or store a count for duplicate words).
- In real code, use a library or `std::set<std::string>` if you only need exact lookup — a trie's benefit is prefixes.

## Practice Questions

1. Build a trie and insert `{"apple", "app", "ape", "bat"}`; test `search("app")` vs `startsWith("app")`.
2. Count how many words start with a given prefix.
3. Implement autocomplete that returns all words with a prefix.
4. Implement trie deletion for "app" (leaving "apple" intact).
5. Explain one scenario where a trie is clearly better than a hash set.

## Multiple Choice Questions (MCQs)

### Q1. Each node in a trie typically represents:
- a) A whole word
- b) A single character
- c) A sentence
- d) A byte count

**Answer:** b

### Q2. `search("ca")` on a trie containing "cat" returns:
- a) True, because the path exists
- b) False, because "ca" is not marked as a word end
- c) True, if the root is "ca"
- d) Undefined

**Answer:** b — search requires `isEnd`.

### Q3. The main advantage of a trie over a hash set is:
- a) Faster exact lookup
- b) Efficient prefix/startsWith queries
- c) Less memory always
- d) Built-in sorting

**Answer:** b

### Q4. A word's "end" in a trie is marked with:
- a) A null child
- b) A boolean flag (`isEnd`)
- c) A special root
- d) The string's length

**Answer:** b

### Q5. Insert and search in a trie are O(L) where L is:
- a) The number of words
- b) The length of the word
- c) The alphabet size
- d) The tree height

**Answer:** b

## Key Takeaways

- A trie stores strings as character paths; shared prefixes are stored once.
- `search` requires `isEnd`; `startsWith` only needs the path.
- Insert/search/prefix are O(L); autocomplete = DFS under the prefix node.
- Tries win when the problem is about **prefixes**.

## Module 13 Complete 🎉

You've finished **Module 13 — Trees**. Next up: **Module 14 — Graphs**.
