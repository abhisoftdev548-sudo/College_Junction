---
module: 13
topic: "13.2"
title: "Binary Search Trees (BST)"
slug: "binary-search-trees"
difficulty: "Advanced"
prerequisites:
  - Binary Trees
  - Recursion
  - Searching
estimated_minutes: 30
tags:
  - dsa
  - bst
  - trees
---

# 13.2 Binary Search Trees (BST)

## Overview

A **Binary Search Tree (BST)** is a binary tree with an ordering invariant: for every node, values in its **left** subtree are smaller and values in its **right** subtree are larger. That one rule makes search, insert, and delete **O(log n)** on average — and makes the inorder traversal come out **sorted**.

## Learning Objectives

After this lesson you will be able to:

- State the BST ordering invariant
- Implement search, insertion, and deletion
- Explain why inorder traversal is sorted
- Find the minimum/maximum and a node's successor
- Recognize degenerate BSTs and their cost

## Core Concepts

### The invariant

```cpp
// for every node n:
//   all values in n->left  < n->val
//   all values in n->right > n->val
```

### Search

```cpp
TreeNode* search(TreeNode* n, int key) {
    if (!n || n->val == key) return n;
    if (key < n->val) return search(n->left, key);
    return search(n->right, key);
}
```

Each comparison skips half the remaining tree → O(log n) when balanced.

### Insert

```cpp
TreeNode* insert(TreeNode* n, int key) {
    if (!n) return new TreeNode(key);       // found the spot
    if (key < n->val) n->left = insert(n->left, key);
    else n->right = insert(n->right, key);
    return n;
}
```

### Delete (three cases)

```cpp
TreeNode* erase(TreeNode* n, int key) {
    if (!n) return nullptr;
    if (key < n->val) n->left = erase(n->left, key);
    else if (key > n->val) n->right = erase(n->right, key);
    else {
        // case 1: no left child
        if (!n->left) { TreeNode* r = n->right; delete n; return r; }
        // case 2: no right child
        if (!n->right) { TreeNode* l = n->left; delete n; return l; }
        // case 3: two children — replace with inorder successor
        TreeNode* succ = minNode(n->right);
        n->val = succ->val;
        n->right = erase(n->right, succ->val);
    }
    return n;
}
```

### Minimum and successor

```cpp
TreeNode* minNode(TreeNode* n) {           // leftmost node
    while (n && n->left) n = n->left;
    return n;
}

TreeNode* maxNode(TreeNode* n) {           // rightmost node
    while (n && n->right) n = n->right;
    return n;
}
```

The **inorder successor** of a node is the leftmost node of its right subtree (when a right child exists).

### Inorder is sorted

Because of the invariant, visiting left → root → right produces values in **ascending order** — that's why inorder is *the* traversal for BSTs.

## Visual — A BST

```
          8
        /   \
       3     10
      / \      \
     1   6      14
        / \    /
       4   7  13

 inorder: 1 3 4 6 7 8 10 13 14   ← sorted!

 search(7): 8→3→6→7   (log n steps)
 min = 1 (leftmost),  max = 14 (rightmost)
```

Every left subtree is smaller, every right subtree is larger — the ordering invariant is global, not just per-edge.

## Code Examples

### Example 1 — Check if a tree is a BST

```cpp
bool isBST(TreeNode* n, long long lo, long long hi) {
    if (!n) return true;
    if (n->val <= lo || n->val >= hi) return false;   // violates range
    return isBST(n->left, lo, n->val) &&
           isBST(n->right, n->val, hi);
}

// call: isBST(root, LLONG_MIN, LLONG_MAX)
```

### Example 2 — k-th smallest element (via inorder)

```cpp
void kthSmallest(TreeNode* n, int& k, int& result) {
    if (!n || k == 0) return;
    kthSmallest(n->left, k, result);
    if (--k == 0) { result = n->val; return; }   // in-order position
    kthSmallest(n->right, k, result);
}
```

### Example 3 — Range query (values between lo and hi)

```cpp
void rangeSum(TreeNode* n, int lo, int hi, int& total) {
    if (!n) return;
    if (n->val >= lo) rangeSum(n->left, lo, hi, total);   // may contain in-range
    if (n->val >= lo && n->val <= hi) total += n->val;
    if (n->val <= hi) rangeSum(n->right, lo, hi, total);
}
```

## Common Mistakes

1. **Allowing equal values on the "wrong" side** — define duplicates consistently (e.g. left ≤ or right ≥).
2. **Checking only per-edge** — a child can satisfy its parent but violate a grandparent; pass ranges (`lo`, `hi`).
3. **Forgetting to update the child pointer** on insert/delete — `n->left = insert(...)` matters.
4. **Using `int` for range bounds** — values at the extremes overflow; use `long long`/sentinel limits.
5. **Deleting the wrong node in the two-child case** — replace with the successor's **value**, then delete the successor.
6. **Assuming BST is always O(log n)** — a degenerate (chain) BST is O(n); self-balancing trees fix this.

## Best Practices

- Recursion matches the tree shape; pass parent ranges when validating.
- Reassign child pointers on insert/delete (`n->left = ...`).
- Use the inorder-successor trick for two-child deletion.
- In real code, prefer `std::set`/`std::map` (balanced trees) over hand-rolled BSTs.
- Note the balanced vs degenerate distinction (→ AVL/Red-Black next).

## Practice Questions

1. Build a BST from `{8, 3, 10, 1, 6, 14, 4, 7, 13}` and print its inorder traversal.
2. Implement recursive `search`, `insert`, and `erase` for a BST.
3. Validate a tree is a BST using range bounds.
4. Find the minimum, maximum, and the k-th smallest element.
5. Delete a two-child node and verify the tree remains a valid BST.

## Multiple Choice Questions (MCQs)

### Q1. In a BST, all values in the left subtree of a node are:
- a) Greater than the node
- b) Smaller than the node
- c) Equal to the node
- d) Random

**Answer:** b

### Q2. Inorder traversal of a BST produces:
- a) Random order
- b) Values in sorted order
- c) Reverse order
- d) Level order

**Answer:** b

### Q3. Search in a *balanced* BST is:
- a) O(n)
- b) O(log n)
- c) O(n log n)
- d) O(1)

**Answer:** b

### Q4. To delete a node with two children, you typically:
- a) Delete the whole subtree
- b) Replace it with its inorder successor's value
- c) Replace it with the root
- d) Leave it in place

**Answer:** b

### Q5. A BST that degenerates into a chain has operations of:
- a) O(log n)
- b) O(n)
- c) O(1)
- d) O(n log n)

**Answer:** b — this is why self-balancing trees exist.

## Key Takeaways

- BST invariant: left < node < right (globally, not just per-edge).
- Search/insert/delete are O(log n) when balanced; O(n) when degenerate.
- Inorder is sorted; k-th smallest and range queries ride on inorder.
- Validate with range bounds; reassign child pointers on insert/delete.

## Next Topic

[13.3 Tree Traversals](lesson-13.3-tree-traversals.md)
