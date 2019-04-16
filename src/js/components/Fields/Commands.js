
import React from 'react'
import Sortable from 'react-sortablejs';
import Icon from '../Icon';
import Link from '../Link';
import * as helpers from '../../helpers';

export default class Commands extends React.Component{

	constructor(props){
		super(props);
	}

	onChange(order){
        let commands = {};
        for (let i = 0; i <= order.length; i++){
            let command = this.props.commands[order[i]];
            if (command){
                commands[command.id] = {...command, ...{sort_order: i}};
            }
        }

        this.props.onChange(commands);
	}

	commands(){
        let commands = [];
        
		if (this.props.commands){
			for (let key of Object.keys(this.props.commands)){
                commands.push({...this.props.commands[key]});
			}
        }
        
        commands = helpers.sortItems(commands, 'sort_order');
		
		return commands;
	}

	render(){
        const commands = this.commands();
        
        if (!commands){
            return null;
        }

		return (
            <Sortable 
                options={{
                    handle: ".commands-setup__item__drag-handle",
                    animation: 150
                }}
                className="list commands-setup" 
                onChange={(order, sortable, e) => {this.onChange(order)}}>
                {
                    commands.map(command => {
                        return (
                            <div className="list__item commands-setup__item list__item--no-interaction" key={command.id} data-id={command.id}>
                                <div className="col col--w90">
                                    <Icon className="commands-setup__item__drag-handle" name="drag_indicator" />
                                    <div className="commands__item commands__item--small">
                                        <Icon className="commands__item__icon" name={command.icon} />
                                        <span className={command.colour+'-background commands__item__background'}></span>
                                    </div>
                                    <div className="commands-setup__item__url commands__item__url">
                                        {command.name ? command.name : <span className="grey-text">{command.url}</span>}
                                    </div>
                                </div>
                                <div className="commands-setup__item__actions">
                                    <a className="commands-setup__item__run-button action" onClick={e => this.props.runCommand(command.id, true)}>
                                        <Icon name="play_arrow" />
                                    </a>
                                    <Link className="commands-setup__item__edit-button action" to={'/edit-command/'+command.id}>
                                        <Icon name="edit" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                }
			</Sortable>
		);
	}
}