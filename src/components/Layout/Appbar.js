import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 10,
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(65),
      width: '500px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default function SimpleTabs(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    setPhoto(event.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(photo)
    const url =
      'https://api.unsplash.com/search/photos?page=1&query=' +
      photo +
      '&client_id=' +
      client
    axios.get(url).then((response) => {
      console.log(response)
      setResult(response.data.results)
    })
  }
  const [result, setResult] = useState([])
  const [photo, setPhoto] = useState('')
  const [client, setClientId] = useState(
    'C54w9fu4XeSPPvkJ6I6MFkyzMyBsiWVFG6THUMTXV-Q'
  )

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <form onSubmit={handleSubmit}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={handleChange}
              name='photo'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </form>
      </AppBar>

      {result.map((photo) => {
        return (
          <div className='photosGrid'>
            <img src={photo.urls.small} />

            <a
              href={`https://unsplash.com/photos/${photo.id}/download?force=true`}
              target='_blank'
              download
            >
              <button>
                <i className='fas fa-download' />
                Download File
              </button>
            </a>
          </div>
        )
      })}
    </div>
  )
}
