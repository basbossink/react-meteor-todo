TodoForm = React.createClass({

//    mixins: [ReactMeteor.Mixin],

    render: function() {
        return (
            <form className="ui form todoForm" onSubmit={this.submit}>
                <div className="three fields">
                    <div className="field">
                        <input type="text" placeholder="Type to add new tasks" ref="text" />
                    </div>
                    <div className="field">
                        <div className="ui toggle checkbox">
                            <input ref="important" type="checkbox" />
                            <label>Important</label>
                        </div>
                    </div>
                    <div className="field">
                        <input type="text" placeholder="Type a list of tags separated by commas" ref="tags" />
                    </div>
                    <input type="submit"></input>
                </div>
            </form>
        );
    },

    submit: function(e) {
        console.log("Entering submit");
        e.preventDefault();

        var checkbox = $(React.findDOMNode(this)).find(".ui.checkbox");

        // Get values from form elements
        var text =  React.findDOMNode(this.refs.text).value.trim();
        console.log("Before finding tags");
        var tags =  React.findDOMNode(this.refs.tags).value.trim().split(',').map(function(item) {return item.trim();});
        tags = tags.filter(function(item) {return item.length !== 0;});
          //.filter(function (item) {return item.trim().length === 0});
        console.log(tags);
        var important = checkbox.checkbox("is checked");
        console.log("Before if text");
        if (!text) {
            return;
        }

        // Delegate task subnmission to TodoApp component
        this.props.onSubmit({
            text: text,
            tags: tags,
            important: important
        })

        // Reset form elements
        React.findDOMNode(this.refs.text).value = "";
        React.findDOMNode(this.refs.tags).value = "";
        checkbox.checkbox("uncheck");
        return;
    },

    // componentDidMount is fired after the component has been rendered for the
    // first time
    componentDidMount: function() {
        $(React.findDOMNode(this)).find(".ui.checkbox").checkbox();
    }

});
