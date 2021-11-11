const selections = figma.currentPage.selection

if (selections.length > 1) {
  // TODO: support multi-export
  figma.closePlugin("Please only select only a single node and re-run this plugin.")
} else if (selections.length === 0) {
  figma.closePlugin("Select a node and re-run this plugin.")
} else {
  const selectedNode = selections[0]
  console.log(selectedNode)
  console.log(selectedNode.type)
  // want it to be COMPONENT
  // or (sometimes) INSTANCE
  // selectedNode.mainComponent, selectedNode.masterComponent
}
