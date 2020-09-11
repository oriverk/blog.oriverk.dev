export const alignHeading = () => {
  return tree => {
    const heading = tree.children.filter(child => child.type === 'heading')
    const min = Math.min(...heading.map(h => h.depth))
    if (min === 1) {
      heading.forEach(node => {
        node.depth = node.depth + 1
      })
    }
  }
}