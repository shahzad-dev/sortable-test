import React from 'react';
import Relay from 'react-relay';
import hobbyAddMutation from './hobbyAddMutation';
import SharedGroup from './SharedGroup';
import ItemCloneList from './ItemCloneList';

class App extends React.Component {

    static contextTypes = {
      relay: Relay.PropTypes.Environment,
    }

    constructor( props, context ) {

      super( props, context )

      this.state = {
        count: 0,
        groups: [
          {name: "A", list: ['Apple', 'Banaba', ]},
          {name: "B", list: ['Lemon', 'Orange',]},
          {name: "C", list: ['Cherry', 'Grape',]},
          {name: "D", list: ['Pear', 'Peach',]},
        ],
        items: [
            {title: "Short Text", type: "text"},
            {title: "Long Text", type: "textarea"},
            {title: "Statement", type: "textarea"},
            {title: "DropDown", type: "textarea"},
            {title: "Email", type: "textarea"},
            {title: "Date", type: "textarea"},
        ],
      }
    }

_handle_OnChange = ( event ) => {
    //this.setState({count: this.state.count + 1});
    //console.log(this.props.viewer.hobbies.edges.length);
    this.context.relay.commitUpdate(
        new hobbyAddMutation( {
          id: `${this.props.viewer.hobbies.edges.length + 1}`,
          title: `blah`, // ${this.state.count}`,
          Viewer: this.props.viewer
        } )
      )
    this.setState({count: this.props.viewer.hobbies.edges.length });
 }
 _handle_ListChange = (groupName, items) => {
   console.log('Group', groupName, items)
   let groups = this.state.groups;
   for(let index in groups) {
      if(groups[index].name === groupName) groups[index].list = items;
   }
   this.setState({groups});
 }
 _handle_ListChange_2 = (...args) => {
   //console.log(args);
 }
  render() {
    return (
      <div>{
          this.state.groups.map((group, key) =>
             <SharedGroup
                 key={key}
                 items={group.list}
                 groupName={group.name}
                 listChange={this._handle_ListChange.bind(this)}
             />
         )}
         <ItemCloneList
             items={this.state.items}
             groupName={"Items"}
             listChange={this._handle_ListChange_2.bind(this)}
         />
     </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        hobbies(first: 100) {
          edges {
            node {
              title,
            },
          },
        },
        ${hobbyAddMutation.getFragment('Viewer')},
      }
    `,
  },
});
