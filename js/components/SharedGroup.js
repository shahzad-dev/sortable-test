import React from 'react';
import Sortable from 'react-sortablejs';
import {List, ListItem} from 'material-ui/List';

const style = {
    backgroundColor: "#FFF",
    padding: "5px 8px",
    margin: 5,
    border: "1px solid #e9e9e9",
}
// Functional Component
class SharedGroup extends React.Component {
    constructor( props, context ) {
      super( props, context )
      this.state = {
        backgroundColor: "#FFF",
      }
    }
    onHover = (e) => {
       console.log("Hover");
    }
    render() {
      const { groupName, listChange } = this.props;
      const backgroundColor = this.state.backgroundColor;
      let items = this.props.items.map((val, key) => (
            <div
                style={{...style, cursor: "move"}}
                onMouseOver={this.onHover.bind(this)}
                onMouseOut={this.onHover.bind(this)}
                key={key}
                ref={key}
                data-id={val}>{val}</div>
          ));
      let listName = `SortList-${groupName}`;
      const setColor = (color, e) => { if(e.previousSibling) e.previousSibling.style.backgroundColor = color; }
      const setForAll = (selector, color) => {
        let list = document.querySelectorAll(selector);
        list.forEach((e) => setColor(color, e) );
      }
      return (
        <div style={{width:"25%", float: "left"}}
              key={groupName}
              >
          <div style={{
              border: "1px solid #E0E0E0",
              padding: 10,
              marginBottom: 10
            }}>{listName}</div>
          <Sortable
              // See all Sortable options at https://github.com/RubaXa/Sortable#options
              className={`SortList-${groupName}`}
              style={{minHeight: 200}}
              options={{
                animation: 500,
                group: {
                    name: 'shared',
                    pull: true,
                    put: true,
                },
                onAdd: evt => {
                    setForAll("[class^='SortList-']", "#FFF");
                },
                onUpdate: evt => {
                    setForAll("[class^='SortList-']", "#FFF");
                },
                onMove: (evt, originalEvent) => {
                  setForAll("[class^='SortList-']", "#FFF");
                  setColor("#E0E0E0", evt.to);
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
      );
    }
};

export default SharedGroup;
