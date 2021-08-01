import React, { useEffect } from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './Styles'

import { fetchPosts } from '../redux/posts/actions/FetchPostActions'

const Paginate = ({ page }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { numberOfPages } = useSelector((state) => state.posts)
    
    useEffect(() => {
        if (page) dispatch(fetchPosts(page))
    }, [page, dispatch])

    return (
        <Pagination 
            classes={{ul: classes.ul}}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts/page=${item.page}`}
                />
            )}
        />
    )
}

export default Paginate