figma.showUI(__html__, { visible: false })

figma.ui.onmessage = message => {
  if (message === "download complete") {
    figma.closePlugin("Success!")
  }
}

const selections = figma.currentPage.selection

const exportNode = (node: ComponentNode, name: String) => {
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
      figma.ui.postMessage({ data: img, name })
    })
}

const findComponentNode = (node: SceneNode) => {
  if (node.type === "COMPONENT") {
    const parentName = node.parent.name

    const simplifyName = (name: String): String => {
      return name
        .replace(/Icon[\s-/]+/, "")
        .replace(/([\s-/]+)/g, "-")
        .toLowerCase()
    }

    let name
    // @ts-ignore
    if (node.variantProperties?.Dimensions) {
      // @ts-ignore
      name = `${simplifyName(parentName)}_${node.variantProperties.Dimensions}`
    } else {
      name = simplifyName(node.name)
    }

    exportNode(node, name)
  } else if (node.type === "INSTANCE") {
  } else {
    if (node.parent) {
      // findComponentNode(node.parent)
      console.log(node.parent.type)
    } else {
      // TODO: error
    }
  }
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

  findComponentNode(selectedNode)

  // want it to be COMPONENT
  // or (sometimes) INSTANCE
  // selectedNode.mainComponent, selectedNode.masterComponent
}
