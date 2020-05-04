import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Avatar, Tooltip } from 'react-native-elements'
import { IconButton } from '../../components/buttons/IconButton'
import { AppHeader } from '../../layouts/Header'
import { formatNumber } from '../../actions/base'
import { Gradient } from '../../styles/Gradient'
import { base, fonts, colors, spacing } from '../../styles/base'
import { BackButton } from '../../components/buttons/BackButton'
import { form } from '../../styles/form'
import { influencer_style } from './styles/influencer.styles'
import { updateInfluencer, removeInfluencer, setCurrentInfluencer } from '../../actions/influencer'
import { updateFetchJob } from '../../actions/fetchJob'
import { setCurrentCollab } from '../../actions/collab'

class ViewInfluencer extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    createCollab = influencer => {
        this.props.navigation.navigate('AddCollab', { influencer })
    }

    saveInfluencer = influencer => {
        const { updateInfluencer, setCurrentInfluencer } = this.props
        Alert.alert("Influencer saved")
        updateInfluencer({ ...influencer, to_do: false })
        setCurrentInfluencer({ ...influencer, to_do: false })
    }

    deleteInflu = id => {
        const { fetch_job, removeInfluencer, updateFetchJob } = this.props
        const current = { ...fetch_job.current_fetch_job }
        current.influencers.success = [...current.influencers.success.filter(influ_id => influ_id !== id)]
        updateFetchJob(current)
        removeInfluencer(id)
        Alert.alert("Influencer deleted")
        this.props.navigation.goBack()
    }

    goToProfile = url => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url)
            } else {
                Alert.alert("Opps! Cannot open page")
            }
        })
    }

    goToCollab = () => {
        const { setCurrentCollab, navigation, collab, influencer } = this.props
        setCurrentCollab(collab.all_collabs.find(c =>
            c.details.influencer.username == influencer.current_influencer.username))

        navigation.navigate('ViewCollab')
    }

    render() {
        const { influencer, navigation, fetch_job, collab } = this.props
        const has_collab = collab.all_collabs.find(c => c.details.influencer.username == influencer.current_influencer.username) ? true : false
        return (
            <View>
                <Gradient style={base.container}>
                    <AppHeader
                        left={<BackButton onPress={() => navigation.goBack()} />}
                        center={<View />}
                    />
                    <ScrollView>
                        <View style={influencer_style.topView}>
                            <Avatar
                                size={170}
                                rounded
                                // containerStyle={styles.avatar}
                                source={{
                                    uri: influencer.current_influencer.profile_pic_url,
                                }} />
                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%', marginTop: spacing.LARGE, paddingTop: spacing.LARGE, borderTopWidth: 0.7, borderColor: colors.TERTIARY }}>
                                <View>
                                    <Text style={{ ...form.inputViewLabel, color: colors.WHITE, fontSize: fonts.LARGE, fontWeight: '700' }}>Username</Text>
                                </View>
                                <View>
                                    <Text style={{ ...form.inputViewLabel, color: colors.WHITE, fontSize: fonts.LARGE, fontWeight: '700' }}>{influencer.current_influencer.username}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <TouchableOpacity style={{ ...influencer_style.linkViewInflu, alignSelf: 'center' }} onPress={() => this.goToProfile(influencer.current_influencer.profile_url)}>
                                    <Text style={{ ...base.title, fontSize: 20 }}>Instagram profile</Text>
                                    <IconButton
                                        name='launch'
                                        size={30}
                                        color={colors.TERTIARY}
                                        type='material-icons'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={influencer_style.middleView}>
                            <View style={form.header} >
                                <Text style={base.title}>Details</Text>
                            </View>
                            <View style={{ ...form.detailsBox, paddingTop: spacing.MEDIUM, borderColor: colors.TERTIARY }}>
                                <View>
                                    <Text style={{ ...form.inputViewLabel, fontSize: fonts.LARGE }}>Followers</Text>
                                    <Text style={{ ...form.inputViewLabel, fontSize: fonts.LARGE }}>Media Count</Text>
                                    <Text style={{ ...form.inputViewLabel, fontSize: fonts.LARGE }}>Date added</Text>
                                </View>
                                <View style={form.inputBox}>
                                    <Text style={{ ...form.inputViewLabel, fontSize: fonts.LARGE, fontWeight: '700' }}>{formatNumber(influencer.current_influencer.followers)}</Text>
                                    <Text style={{ ...form.inputViewLabel, fontSize: fonts.LARGE, fontWeight: '700' }}>{formatNumber(influencer.current_influencer.media_count)}</Text>
                                    <Text style={{ ...form.inputViewLabel, fontSize: fonts.LARGE, fontWeight: '700' }}>{fetch_job.current_fetch_job.details.date_fetch_run || fetch_job.current_fetch_job.details.date_created}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ ...base.centered, display: 'flex', marginTop: spacing.MEDIUM, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            {influencer.current_influencer.to_do && <IconButton
                                name='check'
                                size={60}
                                color={colors.GREEN}
                                type='material-icons'
                                onPress={() => this.saveInfluencer(influencer.current_influencer)}
                            />}
                            {has_collab ? <TouchableOpacity onPress={() => this.goToCollab()}>
                                <IconButton
                                    name='account-arrow-right'
                                    size={30}
                                    color={colors.WHITE}
                                    type='material-community'
                                />
                                <Text style={{ ...base.title, color: colors.WHITE, fontSize: 18 }}>See collaboration</Text>
                            </TouchableOpacity> : <TouchableOpacity onPress={() => this.createCollab(influencer.current_influencer)}>
                                    <IconButton
                                        name='account-multiple-plus-outline'
                                        size={40}
                                        color={colors.WHITE}
                                        type='material-community'
                                    />
                                    <Text style={{ ...base.title, color: colors.WHITE, fontSize: 18 }}>New collab</Text>
                                </TouchableOpacity>}
                            <Tooltip popover={<Text>Influencer removed</Text>}><TouchableOpacity>
                                <IconButton
                                    name='close'
                                    size={60}
                                    color={colors.RED}
                                    type='material-icons'
                                    onPress={() => this.deleteInflu(influencer.current_influencer.id)}
                                />
                            </TouchableOpacity></Tooltip>
                        </View>
                    </ScrollView>
                </Gradient>
            </View >
        )
    }
}

const mapStateToProps = state => ({
    fetch_job: state.fetch_job,
    influencer: state.influencer,
    collab: state.collab
})

const mapDispatchToProps = {
    updateInfluencer,
    removeInfluencer,
    setCurrentCollab,
    updateFetchJob,
    setCurrentInfluencer
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewInfluencer)
