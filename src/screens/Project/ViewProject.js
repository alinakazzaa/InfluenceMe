import React from 'react';
import { AppRegistry } from 'react-native'
import { StyleSheet, Text, YellowBox, View, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import * as projectActions from '../../actions/project';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setProjectFetchJobs, setCurrentFetchJob } from '../../actions/fetchJob';
import { FetchJobListProjectView } from '../../components/list/FetchJobListProjectView';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class ViewProjectScreen extends React.Component {
    state = {
        isLoading: true
    }

    componentDidMount() {
        const { user, current_project, setProjectFetchJobs } = this.props
        setProjectFetchJobs(user.id, current_project.id)
        this.setState({ isLoading: false })
    }

    goToFetchJob = fj => {
        const { setCurrentFetchJob } = this.props
        setCurrentFetchJob(fj)
        this.props.navigation.navigate('ViewFetchJob')
    }

    static navigationOptions = {
        headerShown: false
    }

    collabList = (collab, index) => {

        return <View style={styles.collab}><TouchableOpacity key={index} onPress={() => this.props.navigation.navigate('ViewCollab', { collab })}>
            <Avatar
                size="medium"
                rounded
                source={{
                    uri: collab.profileUrl,
                }} />
            <Text style={styles.influName}>{collab.influ}</Text>
        </TouchableOpacity></View>

    }

    render() {
        const { current_project, fetch_jobs } = this.props;
        console.log(current_project)
        return (
            <View style={styles.main}>
                <AppHeader
                    right={<IconButton color="#493649"
                        name='edit'
                        size={27}
                        onPress={() => this.props.navigation.navigate('EditProject')}
                    />}
                    left={
                        <IconButton color="#493649"
                            name='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />}
                />

                <View style={styles.infoContainer}>
                    <View>
                        <View style={styles.top}>
                            <Text style={styles.title}>Details</Text>
                            {current_project.active ? <Text style={styles.title}>Active</Text> : <Text style={styles.title}>Inactive</Text>}

                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Title</Text>
                            <Text style={styles.data}>{current_project.title}</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Date created</Text>
                            <Text style={styles.data}>{current_project.date_created}</Text>
                        </View>
                        <View style={styles.itemCol}>
                            <Text style={styles.lbl}>Description</Text>
                            <Text style={styles.data}>{current_project.description}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <View>
                            <View style={styles.listHead}>
                                <Text style={styles.title}>Collaborations</Text>
                                <TouchableOpacity style={styles.viewAllBtn} onPress={() => this.props.navigation.navigate('AllCollabs')}>
                                    <Text style={styles.title}>View All</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <ScrollView horizontal> */}
                            {/* {current_project.collabs ? current_project.collabs.map((collab, index) => { */}
                            {/* return this.collabList(collab, index) */}
                            {/* }) :  */}
                            <Text style={styles.noneMsg}>No collaborations yet</Text>
                            {/* } */}
                            {/* </ScrollView> */}
                        </View>
                        <View>
                            <View style={styles.listHead}>
                                <Text style={styles.title}>Fetch Jobs</Text>
                                <TouchableOpacity style={styles.viewAllBtn} onPress={() => this.props.navigation.navigate('AllFetchJobs')}>
                                    <Text style={styles.title}>View All</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                contentContainerStyle={styles.scrollContainer}>
                                {fetch_jobs ? <FetchJobListProjectView fetch_jobs={fetch_jobs} goToFetchJob={this.goToFetchJob} />
                                    : <Text>No fetch jobs yet</Text>}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create(
    {
        main:
        {
            backgroundColor: '#f4f1f1',
            flex: 1

        },
        scrollContainer: {
            padding: 5,
            paddingLeft: 0,
        },
        top: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        bottomView: {
            display: 'flex',
            flexDirection: 'column',
        },
        listHead: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        infoContainer: {
            margin: '5%',
        },
        details: {

        },
        collab: {
            display: 'flex',
            flexDirection: 'column',
            borderLeftWidth: 0.5,
            borderColor: '#ded4da',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            alignContent: 'center',

            padding: 20,
        },
        fetchJob: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 13,
            borderBottomWidth: 0.5,
            borderColor: '#ded4da',
        },
        title: {
            fontSize: 16,
            color: '#493649',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'left',
            marginBottom: '4%',
            paddingTop: '3%',
            marginLeft: '3%'
        },
        itemRow: {
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 0.2,
            borderBottomColor: '#b3b3cc',
            padding: '4%',
            justifyContent: 'space-between',
            // textAlign: 'right'
        },
        itemCol: {
            display: 'flex',
            flexDirection: 'column',
            borderBottomWidth: 0.2,
            borderBottomColor: '#b3b3cc',
            padding: '4%',
            paddingBottom: '7%',
            justifyContent: 'space-between',
            marginBottom: '4%'
        },
        lbl: {
            fontSize: 18,
            color: '#5d4d50',
            textTransform: 'uppercase',
        },
        data: {
            fontSize: 18,
            color: '#826478',
        },
        noneMsg: {
            marginLeft: '4%',
            fontSize: 16,
            color: '#826478',
        },
        influName: {
            color: '#846284',
            textTransform: 'uppercase',
            fontSize: 14,
        },
        fjData: {
            color: '#846284',
            textTransform: 'uppercase',
            fontSize: 14,
            width: '40%'
        },
        viewAllBtn: {
            alignSelf: 'center',
            flexWrap: 'wrap'
        }
    });

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project,
    fetch_jobs: state.fetch_job.fetch_jobs
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentFetchJob: setCurrentFetchJob,
    setProjectFetchJobs: setProjectFetchJobs
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewProjectScreen)
