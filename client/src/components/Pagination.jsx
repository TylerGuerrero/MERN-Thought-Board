import React, { useEffect } from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Actions
import { fetchPosts } from '../redux/posts/actions/FetchPostActions'

// Styles
import useStyles from './Styles'

const Paginate = ({ page }) => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const { numberOfPages } = useSelector((state) => state.posts)

    useEffect(() => {
        if (page) dispatch(fetchPosts(page))
    }, [dispatch, page])

    return (
        <Pagination 
            classes={{ul: classes.ul}}
            page={Number(page) || 1}
            count={numberOfPages}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem 
                    { ...item }
                    component={Link}
                    to={`/posts/?page=${item.page}`}
                />
            )}
        />
    )
}

export default Paginate