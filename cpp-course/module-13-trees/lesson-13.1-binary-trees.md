---
module: 13
topic: "13.1"
title: "Binary Trees"
slug: "binary-trees"
difficulty: "Advanced"
prerequisites:
  - Linked Lists
  - Recursion and Backtracking
  - Stacks and Queues
estimated_minutes: 30
tags:
  - dsa
  - trees
  - binary-tree
---

# 13.1 Binary Trees

## Overview

A **tree** is a hierarchical structure of **nodes** connected by edges, with a single **root** and no cycles. A **binary tree** restricts each node to at most two children (left and right). Trees model file systems, organisation charts, expression parsing, and form the foundation of binary search trees, heaps, and tries.

## Learning Objectives

After this lesson you will be able to:

- Define a binary tree node and build a tree
- Traverse a tree in preorder, inorder, postorder (recursively and iteratively)
- Traverse level-by-level (BFS)
- Compute height, size, and other tree properties
- Recognize when recursion is the natural tool for trees

## Core Concepts

### The node

```cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int v, TreeNode* l = nullptr, TreeNode* r = nullptr)
        : val(v), left(l), right(r) {}
};
```

### Depth-first traversals

```cpp
void preorder(TreeNode* n) {          // root → left → right
    if (!n) return;
    visit(n);
    preorder(n->left);
    preorder(n->right);
}

void inorder(TreeNode* n) {           // left → root → right (BST: sorted!)
    if (!n) return;
    inorder(n->left);
    visit(n);
    inorder(n->right);
}

void postorder(TreeNode* n) {         // left → right → root
    if (!n) return;
    postorder(n->left);
    postorder(n->right);
    visit(n);
}
```

### Level-order traversal (BFS)

```cpp
void levelOrder(TreeNode* root) {
    if (!root) return;
    std::queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* n = q.front(); q.pop();
        visit(n);
        if (n->left)  q.push(n->left);
        if (n->right) q.push(n->right);
    }
}
```

### Tree properties via recursion

```cpp
int height(TreeNode* n) {             // longest path to a leaf
    if (!n) return 0;                 // (or -1 depending on convention)
    return 1 + std::max(height(n->left), height(n->right));
}

int size(TreeNode* n) {               // total nodes
    if (!n) return 0;
    return 1 + size(n->left) + size(n->right);
}

int sum(TreeNode* n) {
    if (!n) return 0;
    return n->val + sum(n->left) + sum(n->right);
}
```

Tree algorithms are usually **recursive**: the answer for a node combines the answers of its children.

## Visual — A Binary Tree

```
          1          ← root
        /   \
       2     3
      / \     \
     4   5     6

 preorder:  1 2 4 5 3 6
 inorder:   4 2 5 1 3 6
 postorder: 4 5 2 6 3 1
 level:     1 2 3 4 5 6
```

The traversal order is just "when do you visit the node relative to its children."

## Code Examples

### Example 1 — Count leaves

```cpp
int countLeaves(TreeNode* n) {
    if (!n) return 0;
    if (!n->left && !n->right) return 1;      // a leaf
    return countLeaves(n->left) + countLeaves(n->right);
}
```

### Example 2 — Check if two trees are identical

```cpp
bool sameTree(TreeNode* a, TreeNode* b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a->val == b->val &&
           sameTree(a->left, b->left) &&
           sameTree(a->right, b->right);
}
```

### Example 3 — Iterative preorder with a stack

```cpp
#include <stack>

void preorderIterative(TreeNode* root) {
    if (!root) return;
    std::stack<TreeNode*> st;
    st.push(root);
    while (!st.empty()) {
        TreeNode* n = st.top(); st.pop();
        visit(n);
        if (n->right) st.push(n->right);   // push right first
        if (n->left)  st.push(n->left);    // so left is processed first
    }
}
```

## Common Mistakes

1. **Forgetting the null base case** — `if (!n) return;` is mandatory in every recursive tree function.
2. **Confusing traversal orders** — "inorder" is left-root-right; "preorder" is root-left-right.
3. **Treating height as edges vs nodes** — pick one convention and be consistent.
4. **Recursion depth on skewed trees** — a chain of n nodes recurses n deep (stack overflow); consider iterative for very deep trees.
5. **Dereferencing null children** — always guard `n->left`/`n->right` before use.
6. **Assuming a binary tree is a BST** — sorted inorder only holds for BSTs (next lesson).

## Best Practices

- Use recursion for tree traversals and properties — it mirrors the structure.
- Use BFS (queue) for level-order and shortest-path-in-trees problems.
- Return "combined" values from recursive calls instead of mutating globals.
- Test on: empty tree, single node, and a skewed (chain) tree.

## Practice Questions

1. Build the tree shown in the visual and print its inorder traversal.
2. Write recursive functions for height, size, and sum of a binary tree.
3. Count the number of leaf nodes in a tree.
4. Print a tree level by level (one line per level).
5. Check whether two trees have the same shape (ignoring values).

## Multiple Choice Questions (MCQs)

### Q1. A binary tree node has at most:
- a) One child
- b) Two children
- c) Three children
- d) No children

**Answer:** b

### Q2. Inorder traversal visits a node:
- a) Before its children
- b) Between its left and right subtrees
- c) After its children
- d) Only at the leaves

**Answer:** b — left → root → right.

### Q3. Level-order traversal uses:
- a) A stack
- b) A queue
- c) A priority queue
- d) Recursion only

**Answer:** b — BFS.

### Q4. The base case for most tree recursions is:
- a) The root
- b) `if (!n) return ...;`
- c) The leaves only
- d) A cycle check

**Answer:** b

### Q5. The height of a single-node tree (nodes convention) is:
- a) 0
- b) 1
- c) -1
- d) Undefined

**Answer:** b — one node is height 1 by the "count nodes" convention.

## Key Takeaways

- Binary tree = nodes with left/right children; recursion mirrors the structure.
- Three DFS orders (pre/in/post) and BFS level-order are the core traversals.
- Tree properties combine children's answers (height, size, sum, leaves).
- Always handle the null case; watch recursion depth on skewed trees.

## Next Topic

[13.2 Binary Search Trees (BST)](lesson-13.2-binary-search-trees.md)
