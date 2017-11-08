import React from 'react';
import Sortable from 'react-sortablejs';
import {List, ListItem} from 'material-ui/List';

const style = {
    backgroundColor: "#FFF",
    padding: "5px 8px",
    margin: 5,
    border: "1px solid #e9e9e9",
    clear: 'both',
    position: 'relative',
}
const SettingPanel = () => {
    return <strong>Hello</strong>
}
// Functional Component
class ItemCloneList extends React.Component {
    constructor( props, context ) {
      super( props, context )
      this.state = {
        items: []
      }
    }
    handleClick = (e) => {
       console.log("Clicked");
    }
    render() {
      console.log("Render", this.state.items)
      const { groupName, listChange } = this.props;
      const backgroundColor = this.state.backgroundColor;
      let items = this.props.items.map((item, key) => (
            <div
                style={{...style, cursor: "pointer"}}
                key={key}
                ref={key}
                data-id={item.type}>
                  {item.title}
            </div>
          ));
      let listName = `CloneList-${groupName}`;
      const setColor = (color, e) => e.previousSibling.style.backgroundColor = color;
      const setForAll = (selector, color) => {
        let list = document.querySelectorAll(selector);
        list.forEach((e) => setColor(color, e) );
      }
      return (
    <div>
        <div style={{width:"25%", float: "left"}}
              >
          <Sortable
              // See all Sortable options at https://github.com/RubaXa/Sortable#options
              className={`SortList-${groupName}`}
              style={{minHeight: 200}}
              options={{
                animation: 500,
                sort: false,
                group: {
                    name: 'clone1',
                    pull: 'clone',
                    put: false,
                },
                // Called when creating a clone of element
              	onClone: function (/**Event*/evt) {
              		var origEl = evt.item;
              		var cloneEl = evt.clone;
                  //origEl.innerHTML = '<strong>BLAH</strong>'
              	},
              }}
              ref={`group-${groupName}`}
              onChange={(items) => {
                listChange(groupName, items)
              }}
          >
              {items}
          </Sortable>
        </div>
        <div style={{width:"50%", float: "left"}}
              >
        <Sortable
          style={{minHeight: 250, width: "100%", backgroundColor: "#EEE", padding: "1px 0"}}
          options={{
              animation: 150,
              group: {
                  name: 'clone1',
                  pull: false,
                  put: true
              },
            	// Called by any change to the list (add / update / remove)
            	onSort: (/**Event*/evt) => {
                if (evt.oldIndex != evt.newIndex ) {
                  console.log("Sort")
                //     let tempItems = this.state.items;
                //     console.log("Before")
                //     console.log(tempItems)
                //     var x = evt.oldIndex
                //     var y = evt.newIndex
                //     var item = tempItems[x];
                //     tempItems[x] = tempItems[y];
                //     tempItems[y] = item
                //     console.log('Sort', evt.oldIndex, evt.newIndex)
                //     //
                //     // let oldPos = items[evt.newIndex];
                //     // let newPos = items[evt.oldIndex];
                //     // items[evt.oldIndex] = oldPos
                //     // items[evt.newIndex] = newPos
                //     // // // console.log('Sort', evt);
                //     // // // console.log(evt.oldIndex, evt.newIndex, evt.item.getAttribute('data-id'))
                //     console.log("After")
                //     console.log(tempItems)
                //     // //
                //     this.setState({ items: tempItems })
                }
                // var childs = evt.to.children;
                // var items = Object.keys(childs).map( key => {
                //   let item = childs[key]
                //   //evt.to.children[key].remove()
                //   return { type: item.getAttribute('data-id'),
                //            text: item.innerText }
                // })
                //
                // this.setState({ items })

              },
              onEnd: (/**Event*/evt) => {
                if (evt.oldIndex != evt.newIndex ) {
                    // //console.log("Sort")
                    // let tempItems = this.state.items;
                    // console.log("Before")
                    // console.log(tempItems)
                    // var x = evt.oldIndex
                    // var y = evt.newIndex
                    // var item = tempItems[x];
                    // tempItems[x] = tempItems[y];
                    // tempItems[y] = item
                    // console.log('Sort', evt.oldIndex, evt.newIndex)
                    // //
                    // // let oldPos = items[evt.newIndex];
                    // // let newPos = items[evt.oldIndex];
                    // // items[evt.oldIndex] = oldPos
                    // // items[evt.newIndex] = newPos
                    // // // // console.log('Sort', evt);
                    // // // // console.log(evt.oldIndex, evt.newIndex, evt.item.getAttribute('data-id'))
                    // console.log("After")
                    // console.log(tempItems)
                    // // //
                    // this.setState({ items: tempItems })
                }
                // var itemEl = evt.item;  // dragged HTMLElement
                // evt.to;    // target list
                // evt.from;  // previous list
                // evt.oldIndex;  // element's old index within old parent
                // evt.newIndex;  // element's new index within new parent
                //console.log('End', evt.oldIndex, evt.newIndex, evt.item.getAttribute('data-id'))
                // if (evt.oldIndex != evt.newIndex ) {
                //     let { items } = this.state;
                //     // var x = evt.oldIndex
                //     // var y = evt.newIndex
                //     // var item = items[y];
                //     // items[y] = items[x];
                //     // items[x] = item
                //     console.log('Sort', evt.oldIndex, evt.newIndex)
                //     console.log(items)
                //
                //     // let oldPos = this.state.items[evt.oldIndex];
                //     // let newPos = this.state.items[evt.newIndex];
                //     // items[evt.newIndex] = oldPos
                //     // items[evt.oldIndex] = newPos
                //     this.setState({ items })
                // }
              },
              onAdd: (/**Event*/evt) => {
                //evt.item.innerHTML +=
                //evt.item.remove()
                console.log('Add', evt)
                let items = this.state.items
                items.push( { type: evt.item.getAttribute('data-id'),
                              text: evt.item.innerText } ) //evt.item )
                this.setState({ items })
                evt.item.remove()

                //console.log( this.state.items )

              },
          }}
          className={`CloneList-${groupName}`}
          >
            { this.state.items.map( (item, key) =>
              <div key={key} style={{...style, cursor: "pointer"}} data-id={key}>
                <div onClick={this.handleClick.bind(this)}>
                  {key} - {item.text} ( {item.type} )
                </div>
                <div style={{position: 'absolute', right: 2, top: 6}} >
                  <a onClick={() => console.log('A')}> [ * ] </a>
                  <a onClick={() => console.log('B')}> [ + ] </a>
                  <a onClick={() => console.log('C')}> [ = ] </a>
                  <a onClick={() => console.log('D')}> [ ^ ] </a>
                </div>
              </div>
            )}
        </Sortable>
      </div>
    </div>
      );
    }
};

export default ItemCloneList;
