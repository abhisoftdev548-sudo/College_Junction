---
module: 16
topic: "16.1"
title: "Trees and Binary Search Trees"
slug: "trees-and-binary-search-trees"
difficulty: "Advanced"
prerequisites:
  - Recursion and Backtracking
estimated_minutes: 35
tags:
  - java
  - dsa
  - tree
  - bst
---

# 16.1 Trees and Binary Search Trees

## Overview

A **tree** is a hierarchical structure of nodes (each with children). A **binary tree** has up to two children per node; a **Binary Search Tree (BST)** adds the ordering rule: left < node < right. Trees are everywhere — file systems, DOMs, expression evaluation — and are traversed with recursion (or stacks/queues).

## Learning Objectives

After this lesson you will be able to:

- Define a binary tree node and build a tree
- Traverse with pre-order, in-order, post-order, and level-order
- Implement BST insert, search, and delete
- Compute tree height and validate a BST
- Apply recursion to tree problems

## Core Concepts

### The node

```java
class TreeNode {
    int val;
    TreeNode left, right;

    TreeNode(int val) { this.val = val; }
}
```

### Traversals

```java
// In-order (left, root, right) — BST gives SORTED order
public static void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    System.out.print(root.val + " ");
    inorder(root.right);
}

// Pre-order (root, left, right)
public static void preorder(TreeNode root) {
    if (root == null) return;
    System.out.print(root.val + " ");
    preorder(root.left);
    preorder(root.right);
}

// Post-order (left, right, root)
public static void postorder(TreeNode root) {
    if (root == null) return;
    postorder(root.left);
    postorder(root.right);
    System.out.print(root.val + " ");
}
```

### Level-order traversal (BFS)

```java
public static void levelOrder(TreeNode root) {
    if (root == null) return;
    Deque<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        TreeNode n = queue.poll();
        System.out.print(n.val + " ");
        if (n.left != null) queue.offer(n.left);
        if (n.right != null) queue.offer(n.right);
    }
}
```

### BST — insert

```java
public static TreeNode insert(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val < root.val) root.left = insert(root.left, val);
    else if (val > root.val) root.right = insert(root.right, val);
    return root;
}
```

### BST — search

```java
public static boolean search(TreeNode root, int val) {
    if (root == null) return false;
    if (root.val == val) return true;
    return val < root.val ? search(root.left, val) : search(root.right, val);
}
```

### BST — delete

```java
public static TreeNode delete(TreeNode root, int val) {
    if (root == null) return null;
    if (val < root.val) root.left = delete(root.left, val);
    else if (val > root.val) root.right = delete(root.right, val);
    else {
        if (root.left == null) return root.right;   // one/no child
        if (root.right == null) return root.left;
        // two children: replace with in-order successor (min of right subtree)
        TreeNode successor = root.right;
        while (successor.left != null) successor = successor.left;
        root.val = successor.val;
        root.right = delete(root.right, successor.val);
    }
    return root;
}
```

### Tree height

```java
public static int height(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(height(root.left), height(root.right));
}
```

### Validate a BST

```java
public static boolean isBST(TreeNode root, Integer min, Integer max) {
    if (root == null) return true;
    if ((min != null && root.val <= min) || (max != null && root.val >= max)) return false;
    return isBST(root.left, min, root.val) && isBST(root.right, root.val, max);
}
```

## Visual — A Binary Search Tree

```
          8
        /   \
       3     10
      / \      \
     1   6      14
        / \     /
       4   7   13

 in-order:  1 3 4 6 7 8 10 13 14   ← sorted!
 rule: left < node < right
```

BST ordering makes search/insert/delete O(log n) when balanced (O(n) worst-case if skewed).

## Code Examples

### Example 1 — Build and traverse a BST

```java
public class BST {
    static class TreeNode {
        int val; TreeNode left, right;
        TreeNode(int v) { val = v; }
    }

    static TreeNode insert(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        if (val < root.val) root.left = insert(root.left, val);
        else if (val > root.val) root.right = insert(root.right, val);
        return root;
    }

    static void inorder(TreeNode root) {
        if (root == null) return;
        inorder(root.left);
        System.out.print(root.val + " ");
        inorder(root.right);
    }

    public static void main(String[] args) {
        TreeNode root = null;
        for (int v : new int[]{8, 3, 10, 1, 6, 14, 4, 7, 13}) root = insert(root, v);
        inorder(root);   // 1 3 4 6 7 8 10 13 14
    }
}
```

### Example 2 — Level-order (BFS)

```java
import java.util.*;

public class LevelOrder {
    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){ val = v; } }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);

        Deque<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        while (!q.isEmpty()) {
            TreeNode n = q.poll();
            System.out.print(n.val + " ");
            if (n.left != null) q.offer(n.left);
            if (n.right != null) q.offer(n.right);
        }   // 1 2 3 4 5
    }
}
```

### Example 3 — Height and validation

```java
public class TreeStats {
    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){ val = v; } }

    static int height(TreeNode root) {
        return root == null ? 0 : 1 + Math.max(height(root.left), height(root.right));
    }

    static boolean isBST(TreeNode root, Integer min, Integer max) {
        if (root == null) return true;
        if ((min != null && root.val <= min) || (max != null && root.val >= max)) return false;
        return isBST(root.left, min, root.val) && isBST(root.right, root.val, max);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(5);
        root.left = new TreeNode(3);
        root.right = new TreeNode(8);
        System.out.println(height(root));            // 2
        System.out.println(isBST(root, null, null)); // true
    }
}
```

## Common Mistakes

1. **Forgetting the base case (`root == null`)** — every recursive tree method needs it.
2. **Using `root == null` where `root.left == null` is meant** — off-by-one in child checks.
3. **Skipping the two-child case in delete** — handle 0, 1, and 2 children.
4. **Confusing traversal orders** — in-order is sorted for BST; pre/post differ.
5. **Unbalanced BST** — worst case degrades to O(n); use self-balancing trees (16.2 heaps, red-black in `TreeMap`).
6. **Comparing nodes with `==` instead of values** — compare `.val`.

## Best Practices

- Use recursion for tree problems (natural fit).
- Always handle the null base case first.
- Use a queue for level-order (BFS), recursion/stack for DFS.
- Validate BSTs with min/max bounds, not just parent comparisons.
- Know in-order = sorted for BST.

## Practice Questions

1. Build a BST from an array and print in-order.
2. Implement pre-order, in-order, post-order, and level-order traversal.
3. Implement BST insert, search, and delete (all three child cases).
4. Compute the height of a tree.
5. Validate whether a tree is a BST.

## Multiple Choice Questions (MCQs)

### Q1. In a BST, for every node:
- a) left > node > right
- b) left < node < right
- c) left = right
- d) children are null

**Answer:** b

### Q2. In-order traversal of a BST yields:
- a) Reverse order
- b) Sorted order
- c) Level order
- d) Random order

**Answer:** b

### Q3. Level-order traversal uses:
- a) A stack
- b) A queue (BFS)
- c) Recursion only
- d) A heap

**Answer:** b

### Q4. BST search/insert is O(log n) when:
- a) The tree is balanced
- b) The tree is skewed
- c) The tree is empty
- d) Always

**Answer:** a

### Q5. Deleting a node with two children replaces it with:
- a) The leftmost node
- b) The in-order successor (min of right subtree)
- c) The root
- d) null

**Answer:** b

## Key Takeaways

- Binary tree node = val + left + right; BST: left < node < right.
- Traversals: pre/in/post (DFS) and level-order (BFS).
- BST insert/search/delete; height; validation with min/max bounds.
- Balanced BST = O(log n); skewed = O(n).

## Next Topic

[16.2 Heaps and Priority Queues](lesson-16.2-heaps-and-priority-queues.md)
