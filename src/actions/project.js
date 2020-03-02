import { db } from '../database/config/db';
import { DB_USER_PROJECTS_REF, SET_PROJECTS_PENDING, SET_CURRENT_PROJECT, UPDATE_STATE_PROJECTS, SET_PROJECTS_SUCCESS, SET_PROJECTS_ERROR, CLEAR_CURRENT_PROJECT, ADD_PROJECT, UPDATE_PROJECT, REMOVE_PROJECT } from '../constants';
import { DATE_TODAY } from '../constants/TodayDate'

export const getUserProjects = user_id => {
    const active = []
    const archived = []

    DB_USER_PROJECTS_REF(user_id).on('value', proj_snapshot => {
        proj_snapshot.forEach(proj_snap => {
            const proj = {
                title: proj_snap.val().details.title,
                active: proj_snap.val().details.active,
                date_created: proj_snap.val().details.date_created,
                description: proj_snap.val().details.description,
                id: proj_snap.val().details.id,
                user_id: user_id
            }
            if (proj_snap.val().details.active == true) {
                active.push(proj)
            } else {
                archived.push(proj)
            }
        })
    })

    if (active.length == 0 && archived.length == 0) {
        let error = { type: 'no projects' }
        return {
            type: SET_PROJECTS_ERROR,
            error: error
        }
    } else {
        return {
            type: SET_PROJECTS_SUCCESS,
            active: active,
            archived: archived
        }
    }
}

export const setUserProjectsPending = () => {

    return {
        type: SET_PROJECTS_PENDING,
    }
}

export const clearCurrentProject = () => {
    return {
        type: CLEAR_CURRENT_PROJECT,
    }
}

export const setCurrentProject = project => {
    return {
        type: SET_CURRENT_PROJECT,
        payload: project
    }
}

export const addProject = (user_id, project) => {
    let project_obj = {
        ...project,
        description: project.description || '',
        active: project.active || false,
        date_created: DATE_TODAY,
        id: ''
    }

    const project_add = db.ref(`/Users/${user_id}/Projects/`).push({
        details: { ...project_obj }
    })

    const key = project_add.key
    project_obj = { ...project_obj, id: key }
    db.ref(`/Users/${user_id}/Projects/${key}`).update({
        details: { ...project_obj }
    })

    return {
        type: ADD_PROJECT,
        payload: project_obj
    }
}

export const updateProject = (user_id, project_id, project) => {

    db.ref(`/Users/${user_id}/Projects/${project_id}/details`).update({
        ...project
    });

    return {
        type: UPDATE_PROJECT,
        payload: project
    }


}

export const removeProject = (user_id, project) => {
    db.ref(`/Users/${user_id}/Projects`).child(project.id).remove()

    return {
        type: REMOVE_PROJECT,
        payload: project
    }
}

