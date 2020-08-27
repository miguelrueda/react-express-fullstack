import React from "react";
import { connect } from "react-redux";
import { ConnectedTaskList } from "./TaskList";

const Dashboard = ({ groups }) => {
        return (<div className="row">
            {groups.map(group => {
                return <ConnectedTaskList key={group.id} id={group.id} name={group.name} className="col" />
            })}
        </div>);
};

function mapStateToProps(state) {
    console.log("********", state);
    return {
        groups: state.groups
    }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
