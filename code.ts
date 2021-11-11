figma.showUI(__html__, { visible: false })

figma.ui.onmessage = message => {
  if (message === "download complete") {
    figma.closePlugin("Success!")
  }
}

const selections = figma.currentPage.selection

const exportNode = (node: ComponentNode) => {
  node
    .exportAsync({
      format: "SVG"
    })
    .catch(e => {
      console.log("error")
      console.log(e)
      // TODO: error
    })
    .then(img => {
      figma.ui.postMessage({ data: img, name: node.name })
    })
}

if (selections.length > 1) {
  // TODO: support multi-export
  figma.closePlugin("Please only select only a single node and re-run this plugin.")
} else if (selections.length === 0) {
  figma.closePlugin("Select a node and re-run this plugin.")
} else {
  const selectedNode = selections[0]
  console.log(selectedNode)
  console.log(selectedNode.type)

  if (selectedNode.type === "COMPONENT") {
    exportNode(selectedNode)
  }

  // want it to be COMPONENT
  // or (sometimes) INSTANCE
  // selectedNode.mainComponent, selectedNode.masterComponent
}
