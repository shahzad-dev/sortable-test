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
      const { groupName, listChange } = this.props;
      const backgroundColor = this.state.backgroundColor;
      let items = this.props.items.map((item, key) => (
            <div
                style={{...style, cursor: "pointer"}}
                key={key}
                data-id={key}>
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
          }}
          onChange={(items) => {
              //items = uniq(items); // Remove duplicate items
              this.setState({ items });
          }}
          className={`CloneList-${groupName}`}
          >
            {this.state.items.map( (item, key) =>
              <div key={key} style={{...style, cursor: "pointer"}} data-id={item}>
                <div onClick={this.handleClick.bind(this)}>
                  {key} - {this.props.items[item].title} ( {this.props.items[item].type} )
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
