import { createStackNavigator } from 'react-navigation-stack';
import AllProjects from '../screens/Project/AllProjects';
import AddProject from '../screens/Project/AddProject';
import ProjectView from '../screens/Project/ProjectView';
import AllCollabs from '../screens/Collab/AllCollabs';
import AddCollab from '../screens/Collab/AddCollab';
import ViewCollab from '../screens/Collab/ViewCollab';
import FetchJobView from '../screens/FetchJob/FetchJobView';
import AllFetchJobs from '../screens/FetchJob/AllFetchJobs';
import AddFetchJob from '../screens/FetchJob/AddFetchJob';
import AllInfluencers from '../screens/Influencer/AllInfluencers';
import ViewInfluencer from '../screens/Influencer/ViewInfluencer';

export const ProjectStack = createStackNavigator({
    AllProjects: { screen: AllProjects },
    ProjectView: { screen: ProjectView },
    AddProject: { screen: AddProject },
    AllFetchJobs: { screen: AllFetchJobs },
    FetchJobView: { screen: FetchJobView },
    AddFetchJob: { screen: AddFetchJob },
    AllInfluencers: { screen: AllInfluencers },
    ViewInfluencer: { screen: ViewInfluencer },
    AllCollabs: { screen: AllCollabs },
    ViewCollab: { screen: ViewCollab },
    AddCollab: { screen: AddCollab },
},
    {
        initialRouteName: 'AllProjects'
    });