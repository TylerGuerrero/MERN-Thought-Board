import React, { useEffect } from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
            variant="outlined"
            color="primary"
            shape="rounded"
            page={page}
            count={numberOfPages}
            size="small"
            renderItem={(item) => (
                <PaginationItem 
                    {...item}
                    component={Link}
                    to={`/posts/?page=${item.page}`}
                />
            )}
        />
    )
}

export default Paginate