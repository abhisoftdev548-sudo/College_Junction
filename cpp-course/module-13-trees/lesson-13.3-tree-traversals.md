---
module: 13
topic: "13.3"
title: "Tree Traversals"
slug: "tree-traversals"
difficulty: "Advanced"
prerequisites:
  - Binary Trees
  - Stacks and Queues
  - Recursion
estimated_minutes: 30
tags:
  - dsa
  - trees
  - traversal
---

# 13.3 Tree Traversals

## Overview

Traversals are the way you **visit every node exactly once**. The four core orders — preorder, inorder, postorder (depth-first), and level-order (breadth-first) — are the foundation for serialization, expression trees, tree reconstruction, and countless interview problems. This lesson goes beyond the basics: iterative versions, reconstruction from traversals, and traversal-based algorithms.

## Learning Objectives

After this lesson you will be able to:

- Implement all four traversals recursively and iteratively
- Explain when each order is useful
- Reconstruct a binary tree from preorder+inorder (and postorder+inorder)
- Serialize and deserialize a tree
- Use traversal order to solve value-dependent problems

## Core Concepts

### The four orders, side by side

```cpp
void preorder(TreeNode* n)  { if (!n) return; visit(n); preorder(n->left); preorder(n->right); }
void inorder(TreeNode* n)   { if (!n) return; inorder(n->left); visit(n); inorder(n->right); }
void postorder(TreeNode* n) { if (!n) return; postorder(n->left); postorder(n->right); visit(n); }
// level-order: BFS with a queue (see 13.1)
```

### When to use which

| Order | Typical use |
|---|---|
| Preorder | Copy a tree, serialize, prefix expressions |
| Inorder | BST → sorted values; validate BST |
| Postorder | Delete a tree (children first), postfix expressions |
| Level-order | BFS, shortest path in unweighted trees, "level" questions |

### Iterative inorder (explicit stack)

```cpp
std::vector<int> inorderIterative(TreeNode* root) {
    std::vector<int> out;
    std::stack<TreeNode*> st;
    TreeNode* cur = root;
    while (cur || !st.empty()) {
        while (cur) { st.push(cur); cur = cur->left; }  // go left as far as possible
        cur = st.top(); st.pop();
        out.push_back(cur->val);                        // visit
        cur = cur->right;                               // then right
    }
    return out;
}
```

### Reconstruct from preorder + inorder

```cpp
// preorder: first element is the root.
// inorder:  the root splits the array into left subtree | right subtree.

TreeNode* build(const std::vector<int>& pre, int& pi,
                int lo, int hi, const std::unordered_map<int,int>& inMap) {
    if (lo > hi) return nullptr;
    int rootVal = pre[pi++];
    TreeNode* root = new TreeNode(rootVal);
    int mid = inMap.at(rootVal);            // root's position in inorder
    root->left  = build(pre, pi, lo, mid - 1, inMap);
    root->right = build(pre, pi, mid + 1, hi, inMap);
    return root;
}
```

### Serialization (preorder with null markers)

```cpp
std::string serialize(TreeNode* n) {
    if (!n) return "#,";                              // null marker
    return std::to_string(n->val) + "," +
           serialize(n->left) + serialize(n->right);
}
```

Preorder + explicit `#` markers is enough to rebuild the exact tree.

## Visual — Why Preorder + Inorder Rebuilds a Tree

```
 preorder: [3, 9, 20, 15, 7]     root = 3 (first)
 inorder:  [9, 3, 15, 20, 7]
              └──┘        └────┘
              left          right
              subtree       subtree

 recurse on the two halves:
 left:  pre [9]      → 9
 right: pre [20,15,7] + in [15,20,7] → 20 with left 15, right 7

        3
      /   \
     9    20
         /  \
        15   7
```

Preorder tells you **what** the next root is; inorder tells you **where** the split is.

## Code Examples

### Example 1 — Postorder deletion (free children first)

```cpp
void deleteTree(TreeNode* n) {
    if (!n) return;
    deleteTree(n->left);   // children first...
    deleteTree(n->right);
    delete n;              // ...then the parent
}
```

### Example 2 — Mirror (invert) a tree

```cpp
TreeNode* invert(TreeNode* n) {
    if (!n) return nullptr;
    std::swap(n->left, n->right);   // swap children
    invert(n->left);
    invert(n->right);
    return n;
}
```

### Example 3 — Zigzag level order (BFS with a direction flag)

```cpp
#include <deque>
#include <vector>

std::vector<std::vector<int>> zigzag(TreeNode* root) {
    std::vector<std::vector<int>> out;
    if (!root) return out;
    std::deque<TreeNode*> q{root};
    bool leftToRight = true;
    while (!q.empty()) {
        int n = q.size();
        std::vector<int> level;
        for (int i = 0; i < n; ++i) {
            TreeNode* node;
            if (leftToRight) { node = q.front(); q.pop_front(); }
            else { node = q.back(); q.pop_back(); }
            level.push_back(node->val);
            if (leftToRight) {
                if (node->left) q.push_back(node->left);
                if (node->right) q.push_back(node->right);
            } else {
                if (node->right) q.push_front(node->right);
                if (node->left) q.push_front(node->left);
            }
        }
        out.push_back(level);
        leftToRight = !leftToRight;
    }
    return out;
}
```

## Common Mistakes

1. **Wrong recursion order** — mixing up left/right in traversal implementations.
2. **Reconstructing without inorder** — preorder+postorder alone is ambiguous (unless full tree).
3. **Forgetting null markers in serialization** — without `#`, you can't reconstruct uniquely.
4. **Infinite loop in iterative traversal** — forgetting to advance `cur` after visiting.
5. **Assuming inorder works without a BST** — inorder visits left-root-right for *any* binary tree, but "sorted" only holds for BSTs.
6. **Level-order with a stack instead of a queue** — that gives DFS, not BFS.

## Best Practices

- Pick the traversal that matches the task (table above).
- Use explicit stacks for iterative DFS when recursion depth is a concern.
- Serialize with null markers and preorder.
- Reconstruct using a value→index map for O(n) building.

## Practice Questions

1. Implement all four traversals and print a tree in each order.
2. Reconstruct the tree from `pre = [3,9,20,15,7]` and `in = [9,3,15,20,7]`.
3. Serialize a tree with preorder + `#` markers and deserialize it back.
4. Implement iterative inorder traversal using an explicit stack.
5. Print a tree in zigzag (spiral) level order.

## Multiple Choice Questions (MCQs)

### Q1. Which traversal visits the root BEFORE its children?
- a) Inorder
- b) Postorder
- c) Preorder
- d) Level-order

**Answer:** c

### Q2. To delete a whole tree safely, use:
- a) Preorder
- b) Postorder (children first)
- c) Inorder
- d) Any order works identically

**Answer:** b

### Q3. Reconstructing a unique binary tree requires:
- a) Preorder only
- b) Inorder + (preorder or postorder)
- c) Level-order only
- d) Postorder only

**Answer:** b

### Q4. Serialization with `#` markers uses which traversal commonly?
- a) Preorder
- b) Inorder only
- c) Postorder only
- d) Random

**Answer:** a

### Q5. Level-order traversal is implemented with:
- a) A stack
- b) A queue
- c) A heap
- d) A hash map

**Answer:** b

## Key Takeaways

- Four orders: pre/in/post (DFS) + level-order (BFS).
- Match the traversal to the task (copy → preorder, delete → postorder, sorted → inorder, levels → BFS).
- Reconstruct with inorder + (preorder/postorder); serialize with preorder + null markers.
- Iterative DFS uses an explicit stack; BFS uses a queue.

## Next Topic

[13.4 Heaps and Priority Queues](lesson-13.4-heaps-and-priority-queues.md)
