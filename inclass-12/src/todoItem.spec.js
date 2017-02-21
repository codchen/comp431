import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert the innerHTML of the todo is the text you initially set
        const text = 'initial'
        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={ 0 } text={ text } done={ false } toggle={ _ => _ } remove={ _ => _ } />
        </div>)
        const component = findDOMNode(node).children[0]
        expect(component.children.length).to.equal(3)
        const spanNode = component.children[1]
        expect(spanNode.innerHTML).to.equal(text)
    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert there is no child with classname 'completed'
        const name = 'completed'
        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={ 0 } text={ '' } done={ false } toggle={ _ => _ } remove={ _ => _ } />
        </div>)
        const component = findDOMNode(node).children[0]
        expect(component.children.length).to.equal(3)
        Array.from(component.children).forEach((child) => expect(child.className).to.not.equal(name))
    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument
        // when the checkbox is clicked via TestUtils.Simulate.click()
        // we expect the variable toggled to be true
        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={ 0 } text={ '' } done={ toggled } toggle={ () => { toggled = !toggled } } remove={ _ => _ } />
        </div>)
        const component = findDOMNode(node).children[0]
        TestUtils.Simulate.click(component.children[0])
        expect(toggled).to.equal(true)
    })

    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        // when the remove button is clicked via TestUtils.Simulate.click()
        // we expect the variable removed to be true
        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={ 0 } text={ '' } done={ false } toggle={ _ => _ } remove={ () => removed = !removed } />
        </div>)
        const component = findDOMNode(node).children[0]
        TestUtils.Simulate.click(component.children[2])
        expect(removed).to.equal(true)
    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        // assert that the rendered className is "completed"
        const name = 'completed'
        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={ 0 } text={ '' } done={ true } toggle={ _ => _ } remove={ _ => _ } />
        </div>)
        const component = findDOMNode(node).children[0]
        expect(component.children[1].className).to.equal(name)
    })

})
