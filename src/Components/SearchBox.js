import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PlaceHolder from '../assets/placeholder.png';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBox.css';
import InputAdornment from '@mui/material/InputAdornment';
import AssistantDirectionRoundedIcon from '@mui/icons-material/AssistantDirectionRounded';
import Cloud from '../assets/cloud.png'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import PlaceIcon from '@mui/icons-material/Place';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';

const NOMINATIM_BASE_URL = `https://nominatim.openstreetmap.org/search?`;

function SearchBox(props) {
    const { selectPosition, setSelectPosition } = props;
    const [searchText, setSearchText] = useState('');
    const [listPlace, setListPlace] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPlaceSelected, setIsPlaceSelected] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [dense, setDense] = React.useState(false);

    const handleSearch = (place) => {
        setLoading(true);
        const params = {
            q: place,
            format: 'json',
            addressdetails: 1,
            polygon_geojson: 0,
            countrycodes: 'vn',
        };
        const queryString = new URLSearchParams(params).toString();
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };
        fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                setListPlace(result);
            })
            .catch((error) => {
                setLoading(false);
                console.log('error', error);
            });
    };

    const onChange = (e) => {
        setSearchText(e.target.value)
        handleSearch(e.target.value)
        setIsPlaceSelected(false)
    }
    //-------- Show options
    const handleSelectPlace = (place) => {
        setSelectPosition(place);
        setShowOptions(true)
    }
    //-------- Show second place
    const handleDirection = () => {
        setIsPlaceSelected(true)
    }
    return (


        !isPlaceSelected ? (
            <>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div style={{ flex: 1, margin: 20 }}>
                        <TextField
                            id="outlined-basic"
                            label="Enter start location"
                            variant="outlined"
                            autoComplete='off'
                            style={{ width: "100%" }} value={searchText}
                            onChange={onChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon style={{ cursor: 'pointer' }} onClick={() => handleSearch(searchText)} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div>
                        {!showOptions ? (
                            <List dense={dense}>
                                {listPlace && listPlace.map((item, index) => (
                                    <>
                                        <ListItem key={index} onClick={() => handleSelectPlace(item)} className='place-list'>
                                            <ListItemAvatar>
                                                <img src={PlaceHolder} width={34} height={34} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item?.display_name}
                                            />

                                        </ListItem>
                                        <Divider />
                                    </>

                                ))}
                            </List>

                        ) : (
                            <>
                                <div style={{ margin: "0px 20px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <div>
                                        <p>{selectPosition?.name},</p>
                                        <p>{selectPosition?.address?.country}</p>
                                    </div>
                                    <div style={{ display: "block", justifyContent: "center", textAlign: "center", }}>
                                        <img src={Cloud} width={34} height={34} />
                                        <p>Nhiều mây</p>
                                    </div>

                                </div>
                                <Divider style={{ margin: "20px 0px" }} />
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "20px 50px" }}>
                                    <div className="option-wrapper">
                                        <AssistantDirectionRoundedIcon color="primary" style={{ width: 40, height: 40 }} onClick={() => { handleDirection() }} />
                                        <p className='option-label'>Direction</p>
                                    </div>
                                    <div className="option-wrapper">
                                        <InfoOutlinedIcon color="primary" style={{ width: 40, height: 40 }} />
                                        <p className='option-label'>Infor</p>
                                    </div>
                                    <div className="option-wrapper">
                                        <BookmarkBorderIcon color="primary" style={{ width: 40, height: 40 }} />
                                        <p className='option-label'>Favorite</p>
                                    </div>
                                </div>

                                <Divider style={{ margin: "20px 0px" }} />
                            </>
                        )}


                    </div>

                </div>
            </>
        ) : (
            <div style={{ flex: 1, margin: 20 }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "40px 40px" }}>
                    <DirectionsBikeIcon className='transportations' color="primary" style={{ width: 40, height: 40 }} />
                    <DirectionsBusIcon className='transportations' style={{ width: 40, height: 40 }} />
                    <DirectionsCarIcon className='transportations' style={{ width: 40, height: 40 }} />
                    <DirectionsRunIcon className='transportations' style={{ width: 40, height: 40 }} />
                    <AirplanemodeActiveIcon style={{ width: 40, height: 40 }} />
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <CircleOutlinedIcon style={{ width: 30, height: 30 }} />
                        <MoreVertOutlinedIcon style={{ width: 40, height: 40 }} />
                        <PlaceIcon style={{ width: 40, height: 40, color: 'red' }} />
                    </div>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Start point"
                            variant="outlined"
                            autoComplete='off'
                            style={{ width: "100%" }} value={searchText}
                            onChange={onChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon style={{ cursor: 'pointer' }} onClick={() => handleSearch(searchText)} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="End point"
                            variant="outlined"
                            autoComplete='off'
                            style={{ width: "100%", marginTop: 30 }} value={searchText}
                            onChange={onChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon style={{ cursor: 'pointer' }} onClick={() => handleSearch(searchText)} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div>
                        <SwapVertOutlinedIcon style={{ width: 40, height: 40 }} className='transportations'/>
                    </div>
                </div>

                <div>

                </div>
            </div>
        )


    )
}

export default SearchBox
