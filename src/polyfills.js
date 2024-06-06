// this is for compatibility with google translate, fix originates here: https://github.com/facebook/react/issues/11538#issuecomment-417504600 */
if (typeof window !== 'undefined') {
  if (typeof Node === 'function' && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild
    Node.prototype.removeChild = function (child) {
      if (child.parentNode !== this) {
        // Note: Commented out, but left here for debugging purposes
        // if (console) {
        //   console.error(
        //     'Cannot remove a child from a different parent',
        //     child,
        //     this
        //   )
        // }
        return child
      }
      return originalRemoveChild.apply(this, arguments)
    }

    const originalInsertBefore = Node.prototype.insertBefore
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) {
        // Note: Commented out, but left here for debugging purposes
        // if (console) {
        //   console.error(
        //     'Cannot insert before a reference node from a different parent',
        //     referenceNode,
        //     this
        //   )
        // }
        return newNode
      }
      return originalInsertBefore.apply(this, arguments)
    }
  }
}
