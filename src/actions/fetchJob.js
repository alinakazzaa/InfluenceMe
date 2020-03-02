import { db } from '../database/config/db';
import { DB_PROJECT_FETCH_JOBS_REF, SET_FETCH_JOBS_SUCCESS, SET_FETCH_JOBS_PENDING, SET_FETCH_JOBS_ERROR, SET_CURRENT_FETCH_JOB, SET_RUNNING_FETCH, CLEAR_RUNNING_FETCH, UPDATE_FETCH_JOB_STATUS, ADD_FETCH_JOB, REMOVE_FETCH_JOB, PENDING, UPDATE_FETCH_JOB } from '../constants';

export const getProjectFetchJobs = (user_id, project_id) => {
    const fetch_jobs = []

    DB_PROJECT_FETCH_JOBS_REF(user_id, project_id).on('value', fj_snapshot => {

        fj_snapshot.forEach(fj_snap => {
            const fj = {
                ...fj_snap.val()
            }
            fetch_jobs.push(fj)

        })

    })

    if (fetch_jobs.length == 0) {
        const error = { type: 'no fetch jobs' }
        return {
            type: SET_FETCH_JOBS_ERROR,
            error: error
        }
    } else {
        return {
            type: SET_FETCH_JOBS_SUCCESS,
            fetch_jobs: fetch_jobs
        }
    }
}

export const setProjectFetchJobsPending = () => {

    return {
        type: SET_FETCH_JOBS_PENDING,
    }
}

export const setCurrentFetchJob = fetch_job => {
    return {
        type: SET_CURRENT_FETCH_JOB,
        fetch_job: fetch_job
    }
}

export const clearCurrentFetchJob = () => {
    return {
        type: CLEAR_CURRENT_FETCH_JOB,
    }
}

// export const getNextPagePending = () => {
//     return {
//         type: GET_NEXT_PAGE_PENDING
//     }
// }

// export const getNextPageSuccess = result => {
//     return {
//         type: GET_NEXT_PAGE_SUCCESS,
//         payload: result
//     }
// }

// export const getNextPageError = error => {
//     return {
//         type: GET_NEXT_PAGE_ERROR,
//         error: error
//     }
// }

/// UPDATE FETCH JOBS WITH UPDATED ITEM IN THE STATE!!!!

//DB
export const addFetchJob = (user_id, project_id, fetch_job) => {
    let fj_obj = {
        details: {
            title: fetch_job.value.title,
            date_created: fetch_job.value.date_created,
            hashtag: fetch_job.value.hashtag || '',
            location: fetch_job.value.location || '',
            criteria: String(fetch_job.criteria),
            status: PENDING,
            response: {},
            user_id: user_id,
            project_id: project_id,
            id: ''
        }
    }

    const fj_add = db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).push({
        ...fj_obj
    });


    const key = fj_add.key
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs/${key}/details`).update({
        id: key
    })


    let updated = { ...fj_obj, id: key }

    return {
        type: ADD_FETCH_JOB,
        fetch_job: updated
    }
}

export const updateStateFetchJob = fetch_job => {

    return {
        type: UPDATE_FETCH_JOB,
        fetch_job: fetch_job
    }
}

export const updateFetchJob = fetch_job => {
    console.log(fetch_job)
    db.ref(`/Users/${fetch_job.details.user_id}/Projects/${fetch_job.details.project_id}/FetchJobs/${fetch_job.details.id}`).update({
        ...fetch_job
    });
}

export const removeFetchJob = fetch_job => {
    db.ref(`/Users/${fetch_job.details.user_id}/Projects/${fetch_job.details.project_id}/FetchJobs`).child(fetch_job.details.id).remove()

    return {
        type: REMOVE_FETCH_JOB,
        fetch_job: fetch_job
    }
}

