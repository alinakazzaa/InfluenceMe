import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { setCurrentInfluencer } from '../../actions/influencer'
import { connect } from 'react-redux'
import { InfluencerListFjView } from '../../components/list/InfluencerListFjView'
import { getAllInfluencers } from '../../actions/influencer'
import { TextButton } from '../../components/buttons/TextButton'
import { clearCurrentFetchJob, updateFetchJob, updateStateFetchJob } from '../../actions/fetchJob'
import { fetchMedia } from '../../web/fetchMedia'
import { Bar } from 'react-native-progress'
import { COMPLETED, PENDING, IN_PROGRESS } from '../../constants'
import { fetchPending, fetchResponse, clearRunningFetchJob } from '../../actions/fetch'
import { fetchNextPage } from '../../web/fetchNextPage'
import { COMPLETED_GET_USERS, COMPLETED_FETCH, GET_MEDIA_SUCCESS } from '../../constants/response/types'
import { fetch_job_style } from './styles/fetchJob.styles'
import { BackButton } from '../../components/buttons/BackButton'
import FetchJobForm from '../../components/forms/FetchJobForm'
import { base, dimensions, colors, spacing } from '../../styles/base'
import { Gradient } from '../../styles/Gradient'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { SaveButton } from '../../components/buttons/SaveButton'

class FetchJobView extends React.Component {

    state = {
        fetch_job_value: {
            details: {
                id: '',
                title: '',
                hashtag: '',
                criteria: { follower_min: 0, follower_max: 0 },
                status: ''
            }
        },
    }

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { fetch_job, getAllInfluencers, running_fetch } = this.props

        if (fetch_job.current_fetch_job.details.id == running_fetch.details.id) {
            this.setState({ fetch_job_value: { ...running_fetch } })
        } else {
            this.setState({ fetch_job_value: { ...fetch_job.current_fetch_job } })
        }

        if (fetch_job.current_fetch_job.details.status == COMPLETED && fetch_job.current_fetch_job.influencers.success.length > 0) {
            getAllInfluencers(fetch_job.current_fetch_job)
        }
    }

    componentDidUpdate(prev) {
        const { running_fetch, updateStateFetchJob, fetchPending, fetchResponse } = this.props

        if (running_fetch.pending !== null && prev.running_fetch.details.status !== running_fetch.details.status) {
            updateStateFetchJob(running_fetch)

            if (running_fetch.details.status == COMPLETED) {
                updateFetchJob(running_fetch)
            }
        }

        if (running_fetch.response !== null)
            if (running_fetch.response.type == COMPLETED_GET_USERS || running_fetch.response.type == GET_MEDIA_SUCCESS) {
                if (running_fetch.influencers.success.length < Number(running_fetch.details.no_profiles)) {
                    if (running_fetch.has_next_page)
                        fetchNextPage(running_fetch, fetchPending, fetchResponse)
                } else {
                    fetchResponse({
                        type: COMPLETED_FETCH
                    })
                }
            }

    }

    startFetchJob = () => {
        const { running_fetch, fetch_job, fetchPending, fetchResponse, navigation } = this.props
        this.setState({ isLoading: true })
        let running = { ...running_fetch, details: { ...fetch_job.current_fetch_job.details } }
        fetchMedia(running, fetchPending, fetchResponse)
        this.setState({ isLoading: false })
        navigation.goBack()
    }

    handleChange = updated_fetch_job => {
        const { fetch_job_value } = this.state
        this.setState({
            fetch_job_value: {
                ...fetch_job_value,
                details: {
                    ...fetch_job_value.details,
                    ...updated_fetch_job
                }
            }
        })
    }


    handleSubmit = () => {
        const { fetch_job_value } = this.state
        const { updateStateFetchJob, navigation } = this.props
        updateStateFetchJob(fetch_job_value)
        updateFetchJob(fetch_job_value)
        navigation.goBack()
    }

    // componentWillUnmount() {
    //     const { clearCurrentFetchJob } = this.props
    //     clearCurrentFetchJob()
    // }

    render() {
        const { fetch_job_value } = this.state
        const { influencer, running_fetch } = this.props
        const progress_percent = running_fetch.influencers.success.length /
            Number(running_fetch.details.no_profiles) * 100 || 0
        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={<SaveButton onPress={this.handleSubmit} />}
                />
                <View style={fetch_job_style.viewContainer}>
                    <FetchJobForm goBack={this.props.navigation.goBack} fetch_job={{ ...fetch_job_value.details }} handleChange={this.handleChange} />
                    <View style={fetch_job_style.middle}>
                        <Text style={fetch_job_style.title}>Status</Text>
                        <View style={fetch_job_style.statusView}>
                            {fetch_job_value.details !== null && fetch_job_value.details.status == IN_PROGRESS &&
                                <View style={fetch_job_style.progress}>
                                    <View style={{ marginBottom: spacing.MEDIUM, flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <Gradient style={{ borderRadius: 10 }}>
                                            <Bar indeterminate={true} color={colors.SCREEN} width={dimensions.fullWidth * 0.9} height={25} style={fetch_job_style.progressBar} />
                                        </Gradient>
                                        <View style={fetch_job_style.percentView}><Text style={fetch_job_style.percent}>{progress_percent.toFixed()} %</Text></View>
                                    </View>


                                </View>
                            }
                            {fetch_job_value.details.status !== IN_PROGRESS && <Text style={fetch_job_style.statusData}>{fetch_job_value.details.status}</Text>}
                        </View>
                    </View>
                    {fetch_job_value.details.status == COMPLETED &&
                        <View style={fetch_job_style.bottomView}>
                            <View style={fetch_job_style.influencers}>
                                <Text style={fetch_job_style.title}>Influencers</Text>
                                <TouchableOpacity style={fetch_job_style.viewAllBtn} onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                                    <Text style={fetch_job_style.title}>View All</Text>
                                </TouchableOpacity>
                            </View>
                            {influencer.pending && <LoadingScreen />}
                            {!influencer.pending && <InfluencerListFjView influencers={influencer.all_influencers} />}
                            {influencer.error != null &&
                                <View style={fetch_job_style.none}><Text style={fetch_job_style.data}>{influencer.error.message}</Text></View>}
                        </View>}
                    {fetch_job_value.details.status == PENDING &&
                        < View style={fetch_job_style.btnView}>
                            <TextButton title="Start" containerStyle={fetch_job_style.startBtn} buttonText={base.defaultTxt} onPress={() => this.startFetchJob()} />
                        </View>}
                </View >
            </View >
        )
    }
}


const mapStateToProps = state => ({
    user: state.user,
    fetch_job: state.fetch_job,
    influencer: state.influencer,
    running_fetch: state.running_fetch
})

const mapDispatchToProps = {
    getAllInfluencers,
    setCurrentInfluencer,
    clearCurrentFetchJob,
    clearRunningFetchJob,
    fetchPending,
    fetchResponse,
    updateStateFetchJob
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchJobView)
