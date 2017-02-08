//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;(function(exports) {

'use strict'

function h(tag, props, ...children) {
    return { tag, props: props ? props : { }, 
        children: Array.isArray(children[0]) ? children[0] : children }
}

function setProperty(node, attrName, attrVal) {
    if (attrName === "className") {
        node.setAttribute("class", attrVal)
    } else if (attrName.substring(0,2) === "on") {
        node.addEventListener(attrName.substring(2, attrName.length).toLowerCase(),
            e => {
                attrVal(e)
                update()
            })
    } else {
        node.setAttribute(attrName, attrVal)
    }
}

function createElement(node) {
    let currentNode = document.createElement(node.tag)
    Object.keys(node.props).forEach(key => {
        setProperty(currentNode, key, node.props[key])
    })
    if (node.children) {
        if (typeof(node.children[0]) === "string") {
            currentNode.innerHTML = node.children[0]
        } else {
            node.children.forEach(child => {
                currentNode.appendChild(createElement(child))
            })
        }
    }
	// create the element and return it to the caller
	// the node might have event listeners that need to be registered
	// the node might have children that need to be created as well
	return currentNode
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props && 
            	node1.props.id && node2.props.id && 
            	node1.props.id != node2.props.id)
}

function updateElement(parent, newNode, oldNode, index=0) {
	// index will be needed when you traverse children
	// add the new node to the parent DOM element if
	// the new node is different from the old node 
	// at the same location in the DOM.
	// ideally we also handle inserts, but ignore that functionality for now.

    if (!oldNode) {
        parent.appendChild(createElement(newNode))
    } else {
    	// you can use my changed(node1, node2) method above
    	// to determine if an element has changed or not
        var updateChildren = true
        if (changed(newNode, oldNode)) {
            if (typeof newNode === "string" && typeof oldNode === "string") {
                parent.innerHTML = newNode
                updateChildren = false
            } else if (typeof oldNode === "string") {
                parent.innerHTML = ""
                parent.appendChild(createElement(newNode))
                updateChildren = false
            } else if (typeof newNode === "string") {
                parent.children[index].remove()
                parent.innerHTML = newNode
                updateChildren = false
            } else {
                if (newNode.tag !== oldNode.tag) {
                    parent.insertBefore(createElement(newNode), parent.children[index])
                    parent.children[index + 1].remove()
                    updateChildren = false
                } else {
                    Object.keys(newNode.props).forEach(key => {
                        setProperty(parent.children[index], key, newNode.props[key])
                    })
                }
            }
        }
    	// be sure to also update the children!
        if (updateChildren && parent.children.length > 0) {
            Array.prototype.slice.call(parent.children[index].children).forEach((child, i) => {
                if (i < newNode.children.length) {
                    updateElement(parent.children[index], newNode.children[i], oldNode.children[i], i)
                }
            })
            while (newNode.children.length < parent.children[index].children.length) {
                parent.children[index].children[parent.children[index].children.length - 1].remove()
            }
            if (typeof newNode.children[0] === "string") {
                parent.children[index].innerHTML = newNode.children[0]
            } else {
                while (newNode.children.length > parent.children[index].children.length) {
                    updateElement(parent.children[index], newNode.children[parent.children[index].children.length])
                }
            }
        }
    }
}

const deepCopy = (obj) => {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const props = {}
    if (obj.props) {
        for (let p in obj.props) {
            props[p] = obj.props[p]
        }
    }
    return h(obj.tag, props,
        Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
}

const update = () => requestAnimationFrame(() => {
	// compare the current vdom with the original vdom for updates
    updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
    h.mounted.original = deepCopy(h.mounted.current)
})

h.mount = (root, component) => {
    // we keep a copy of the original virtual DOM so we can diff it later for updates
    const originalComponent = deepCopy(component)
    h.mounted = { root: root, current: component, original: originalComponent }
    updateElement(root, originalComponent)
}

exports.h = h

})(window);