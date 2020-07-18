import React, { useEffect } from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../../components/MyButton';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../../components/MySelect';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Checkbox } from '@material-ui/core';
import IdCard from 'components/IdCard';
import { AddOwnerStyles as useStyles } from './useStyles';
import AdminService from '../../../services/api.js';
import CircularProgress from '@material-ui/core/CircularProgress';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const AddOwner = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const titleList = ['', 'Mr', 'Mrs', 'Mr & Mrs', 'Company', 'Indivision', 'PACS'];

    let company = [];
    const [companies, setCompanies] = React.useState('');
    const [companyList, setCompanyList] = React.useState([]);
    const [companyID, setCompanyID] = React.useState(-1);

    let building = [];
    const [buildings, setBuildings] = React.useState('');
    const [buildingList, setBuildingList] = React.useState([]);
    const [buildingID, setBuildingID] = React.useState(-1);

    const [visibleIndicator, setVisibleIndicator] = React.useState(false);
    const [isSubAccount, setIsSubAccount] = React.useState(false);
    const [isMemberCouncil, setIsMemberCouncil] = React.useState(false);
    const [avatarurl, setAvatarUrl] = React.useState("");
    const [avatar, setAvatar] = React.useState(null);
    const [idcardurls, setIdcardUrls] = React.useState([]);
    const [idcards, setIdcards] = React.useState([null]);
    const [ownerTitle, setOwnerTitle] = React.useState('');
    const [lastname, setLastName] = React.useState('');
    const [firstname, setFirstName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phonenumber, setPhoneNumber] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [apartNumber, setApartNumber] = React.useState([]);
    const [companyName, setCompanyName] = React.useState('');

    const [errorsCompanies, setErrorsCompanies] = React.useState('');
    const [errorsBuildings, setErrorsBuildings] = React.useState('');
    const [errorsOwnerTitle, setErrorsOwnerTitle] = React.useState('');
    const [errorsLastname, setErrorsLastname] = React.useState('');
    const [errorsFirstname, setErrorsFirstname] = React.useState('');
    const [errorsEmail, setErrorsEmail] = React.useState('');
    const [errorsPhonenumber, setErrorsPhonenumber] = React.useState('');
    const [errorsAddress, setErrorsAddress] = React.useState('');
    const [errorsCompanyName, setErrorsCompanyName] = React.useState('');

    const [lotsList, setLotsList] = React.useState([]);
    const [stateLots, setStateLots] = React.useState(false);
    const [buildingVote, setBuildingVote] = React.useState([]);
    const [voteAmount, setVoteAmount] = React.useState(Array.from({length: 100},()=> Array.from({length: buildingVote.length}, () => null)));
    // const voteAmount = [];
    // const apartNumber = [];
    let voteLists = [];
    let votes = [];
    const handleClose = () => {
        props.onCancel();
    };
    useEffect(() => {
        getCompanies();
    }, [companies]);
    useEffect(() => {
        getBuildings();
    }, [companyID]);
    const handleCreate = () => {
        let cnt = 0;
        if (ownerTitle.length === 0) { setErrorsOwnerTitle('please enter owner title'); cnt++; }
        else setErrorsOwnerTitle('');
        if (ownerTitle === '4') {
            if (companyName.length === 0) { setErrorsCompanyName('please enter company name'); cnt++; }
            else setErrorsCompanyName('');
        }
        else {
            if (lastname.length === 0) { setErrorsLastname('please enter owner last name'); cnt++; }
            else setErrorsLastname('');
            if (firstname.length === 0) { setErrorsFirstname('please enter owner first name'); cnt++; }
            else setErrorsFirstname('');
        }
        if (companyID === -1) { setErrorsCompanies('please select companies'); cnt++; }
        else setErrorsCompanies('');
        if (buildingID === -1) { setErrorsBuildings('please select buildings'); cnt++; }
        else setErrorsBuildings('');
        if (email.length === 0) { setErrorsEmail('please enter owner email'); cnt++; }
        else setErrorsEmail('');
        if (phonenumber.length === 0) { setErrorsPhonenumber('please enter owner phone number'); cnt++; }
        else setErrorsPhonenumber('');
        if (address.length === 0) { setErrorsAddress('please enter address'); cnt++; }
        else setErrorsAddress('');

        if (cnt === 0) {
            createOwner();
        }
    }
    const handleLoadFront = (event) => {
        setAvatar(event.target.files[0]);
        setAvatarUrl(URL.createObjectURL(event.target.files[0]));
    }

    const handleLoadIdcard = (event) => {
        idcardurls.push(URL.createObjectURL(event.target.files[0]));
        idcards.push(event.target.files[0])
        setIdcards(idcards);
        setIdcardUrls(idcardurls);
        setState(!state);
    }
    const handleClickCloseIdcard = (num) => {
        delete idcardurls[num];
        delete idcards[num];
        // idcardurls.splice(num, 1);
        // idcards.splice(num, 1);
        setIdcards(idcards);
        setIdcardUrls(idcardurls);
        setState(!state);
    }
    const handleChangeApartNumber = (event, i) => {
        let apartment = [...apartNumber];
        apartment[i] = +event.target.value;
         setApartNumber(apartment);
    }
    const handleChangeVoteAmount = (event, i, j) => {
        let voteamount = [...voteAmount];
        voteamount[i][j] = +event.target.value;
        setVoteAmount(voteamount);
    }
    const handleChangeIsSubAccount = (event) => {
        setIsSubAccount(event.target.checked);
        if (isSubAccount)
            setIsMemberCouncil(!isSubAccount);
        else
            setIsMemberCouncil(isSubAccount);
    }
    const handleChangeIsMemberCouncil = (event) => {
        setIsMemberCouncil(event.target.checked);
        if (isMemberCouncil)
            setIsSubAccount(!isMemberCouncil);
        else
            setIsSubAccount(isMemberCouncil);
    }
    const handleChangeOwnerTitle = (val) => {
        setOwnerTitle(val);
    }
    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    }
    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleChangeCompanyName = (event) => {
        setCompanyName(event.target.value);
    }
    const handleChangeEmail = (event) => {
        event.preventDefault();
        let errorsMail =
            validEmailRegex.test(event.target.value)
                ? ''
                : 'Email is not valid!';
        setEmail(event.target.value);
        setErrorsEmail(errorsMail);
    }
    const handleChangePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    }
    const handleChangeCompanies = (val) => {
        setCompanies(val);
        if (val < companyList.length)
            setCompanyID(companyList[val].companyID);
        else
            setCompanyID(-1);
    };
    const handleChangeBuildings = (val) => {
        setBuildings(val);
        if (val < buildingList.length)
            setBuildingID(buildingList[val].buildingID);
        else
            setBuildingID(-1);
    };
    const handleClickAddLots = (event) => {
        lotsList.push(buildingVote);
        setLotsList(lotsList);
        setStateLots(!stateLots);
    }
    const getCompanies = () => {
        setVisibleIndicator(true);
        AdminService.getCompanyListByUser()
            .then(
                response => {
                    console.log(response.data);
                    setVisibleIndicator(false);
                    if (response.data.code !== 200) {
                        ToastsStore.error(response.data.message);
                    } else {
                        console.log('success');
                        const data = response.data.data;
                        localStorage.setItem("token", JSON.stringify(data.token));
                        data.companylist.map((item) => (
                            company.push(item.name)
                        )
                        );
                        setCompanyList(data.companylist);
                        setCompanyID(data.companylist[0].companyID);
                        company.push('all');
                    }
                },
                error => {
                    ToastsStore.error('Cant connect to the server!');
                    setVisibleIndicator(false);
                }
            );
    }
    const getBuildings = () => {
        const requestData = {
            'search_key': '',
            'page_num': 0,
            'row_count': 20,
            'sort_column': -1,
            'sort_method': 'asc',
            'companyID': companyID
        }
        setVisibleIndicator(true);
        AdminService.getBuildingList(requestData)
            .then(
                response => {
                    setVisibleIndicator(false);
                    if (response.data.code !== 200) {
                        ToastsStore.error(response.data.message);
                    } else {
                        const data = response.data.data;
                        localStorage.setItem("token", JSON.stringify(data.token));
                        data.buildinglist.map((item) => (
                            building.push(item.name)
                        )
                        );
                        setBuildingList(data.buildinglist);
                        setBuildingID(data.buildinglist[0].buildingID);
                        building.push('all');
                    }
                },
                error => {
                    ToastsStore.error("Can't connect to the server!");
                    setVisibleIndicator(false);
                }
            );
    }
    useEffect(() => {
        setVisibleIndicator(true);
        AdminService.getBuilding(buildingID)
            .then(
                response => {
                    setVisibleIndicator(false);
                    if (response.data.code !== 200) {
                        ToastsStore.error(response.data.message);
                    } else {
                        const data = response.data.data;
                        localStorage.setItem("token", JSON.stringify(data.token));
                        const vote_list = data.vote_list;
                        vote_list.map((vote) =>
                            buildingVote.push(vote)
                        )
                        setBuildingVote(buildingVote);
                    }
                },
                error => {
                    ToastsStore.error("Can't connect to the server!");
                    setVisibleIndicator(false);
                }
            );
    }, [buildingID]);
    const getVoteList = () => {
        for (let i = 0; i < apartNumber.length; i++) {
            for (let j = 0; j < voteAmount[i].length; j++) {
                const vote = {
                    'voteID': buildingVote[j].voteID,
                    'vote_amount': voteAmount[i][j]
                }
                votes.push(vote);
            }
            const voteList = {
                'apartment_number': apartNumber[i],
                'vote': votes
            }
            voteLists.push(voteList);
        }
    }
    const createOwner = () => {
        getVoteList();
        const requestData = {
            'type': ownerTitle,
            'owner_role': isSubAccount,
            'buildingID': buildingID,
            'firstname': firstname,
            'lastname': lastname,
            'owner_company_name': companyName,
            'address': address,
            'phone': phonenumber,
            'vote_value_list': voteLists,
            'photo': [avatarurl, ...idcardurls]
        }
        setVisibleIndicator(true);
        AdminService.createOwner(requestData)
            .then(
                response => {
                    setVisibleIndicator(false);
                    if (response.data.code !== 200) {
                        ToastsStore.error(response.data.message);
                    } else {
                        const data = response.data.data;
                        localStorage.setItem("token", JSON.stringify(data.token));
                        props.onAdd();
                        handleClose();
                    }
                },
                error => {
                    ToastsStore.error("Can't connect to the server!");
                    setVisibleIndicator(false);
                }
            );
    }
    return (
        <div className={classes.root}>
            {
                visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
            }
            <div className={classes.paper} sm={12}>
                <Grid container spacing={2} >
                    <Grid item container alignItems="center" spacing={1}>
                        <Grid item><p className={classes.title}>Carbinet</p></Grid>
                        <Grid xs item container direction="column">
                            <MySelect
                                color="gray"
                                data={company}
                                onChangeSelect={handleChangeCompanies}
                                value={companies}
                                width="50%"
                            />
                            {errorsCompanies.length > 0 &&
                                <span className={classes.error}>{errorsCompanies}</span>}
                        </Grid>
                    </Grid>
                    <Grid item container alignItems="center" spacing={1}>
                        <Grid item><p className={classes.title}>Immeuble</p></Grid>
                        <Grid xs item container direction="column">
                            <MySelect
                                color="gray"
                                data={building}
                                onChangeSelect={handleChangeBuildings}
                                value={buildings}
                                width="50%"
                            />
                            {errorsBuildings.length > 0 &&
                                <span className={classes.error}>{errorsBuildings}</span>}
                        </Grid>
                    </Grid>
                    <Grid item container alignItems="center" spacing={1}>
                        <Grid item><p className={classes.title}>Civilité</p></Grid>
                        <Grid xs item container direction="column">
                            <MySelect
                                color="gray"
                                data={titleList}
                                onChangeSelect={handleChangeOwnerTitle}
                                value={ownerTitle}
                                width="50%"
                            />
                            {errorsOwnerTitle.length > 0 &&
                                <span className={classes.error}>{errorsOwnerTitle}</span>}
                        </Grid>
                    </Grid>
                    {
                        ownerTitle === '4' ?
                            <Grid xs={12} item container alignItems="center" spacing={1}>
                                <Grid item><p className={classes.title}>Carbinet Nom</p></Grid>
                                <Grid xs item container direction="column">
                                    <TextField
                                        className={classes.text}
                                        variant="outlined"
                                        value={companyName}
                                        onChange={handleChangeCompanyName}
                                    />
                                    {errorsCompanyName.length > 0 &&
                                        <span className={classes.error}>{errorsCompanyName}</span>}
                                </Grid>
                            </Grid>
                            :
                            <Grid item container spacing={1}>
                                <Grid xs={6} item container alignItems="center" spacing={1}>
                                    <Grid item><p className={classes.title}>Nom</p></Grid>
                                    <Grid xs item container direction="column">
                                        <TextField
                                            className={classes.text}
                                            variant="outlined"
                                            value={lastname}
                                            onChange={handleChangeLastName}
                                        />
                                        {errorsLastname.length > 0 &&
                                            <span className={classes.error}>{errorsLastname}</span>}
                                    </Grid>
                                </Grid>
                                <Grid xs={6} item container alignItems="center" spacing={1}>
                                    <Grid item><p className={classes.title}>Prénom</p></Grid>
                                    <Grid xs item container direction="column">
                                        <TextField
                                            className={classes.text}
                                            variant="outlined"
                                            value={firstname}
                                            onChange={handleChangeFirstName}
                                        />
                                        {errorsFirstname.length > 0 &&
                                            <span className={classes.error}>{errorsFirstname}</span>}
                                    </Grid>
                                </Grid>

                            </Grid>
                    }

                    <Grid item container spacing={1} direction="column">
                        <Grid item><p className={classes.title}>Adresse</p></Grid>
                        <Grid item container direction="column">
                            <TextField
                                className={classes.text}
                                variant="outlined"
                                value={address}
                                onChange={handleChangeAddress}
                                multiline
                                fullWidth
                                rows={5}
                            />
                            {errorsAddress.length > 0 &&
                                <span className={classes.error}>{errorsAddress}</span>}
                        </Grid>
                    </Grid>
                    <Grid xs={6} item container alignItems="center" spacing={1}>
                        <Grid item ><p className={classes.title}>Email</p></Grid>
                        <Grid xs item container direction="column">
                            <TextField
                                className={classes.text}
                                variant="outlined"
                                value={email}
                                onChange={handleChangeEmail}
                            />
                            {errorsEmail.length > 0 &&
                                <span className={classes.error}>{errorsEmail}</span>}
                        </Grid>
                    </Grid>
                    <Grid xs={6} item container alignItems="center" spacing={1}>
                        <Grid item><p className={classes.title}>Téléphone</p></Grid>
                        <Grid xs item container direction="column">
                            <TextField
                                className={classes.text}
                                variant="outlined"
                                value={phonenumber}
                                onChange={handleChangePhoneNumber}
                            />
                            {errorsPhonenumber.length > 0 &&
                                <span className={classes.error}>{errorsPhonenumber}</span>}
                        </Grid>
                    </Grid>
                    <Grid item container justify="space-between" direction="row">
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item ><p className={classes.title}>Locataire</p></Grid>
                                <Grid xs item container>
                                    <Checkbox
                                        checked={isSubAccount}
                                        onChange={handleChangeIsSubAccount}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item><p className={classes.title}>Membre du Conseil Syndical</p></Grid>
                                <Grid xs item container>
                                    <Checkbox
                                        checked={isMemberCouncil}
                                        onChange={handleChangeIsMemberCouncil}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} item container direction="column" >
                        <p className={classes.title}>Photo de profil</p>
                        <Grid item container justify="flex-start">
                            <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront} />
                            <label htmlFor="img_front">
                                {
                                    avatarurl === '' ?
                                        <div className={classes.img}>
                                            <AddCircleOutlineIcon className={classes.plus} />
                                        </div> :
                                        <img className={classes.img} src={avatarurl} alt="" />
                                }
                            </label>
                        </Grid>
                    </Grid>
                    <Grid item container direction="column" spacing={2}>
                        <Grid item>
                            {
                                stateLots !== null ?
                                    <Grid item container direction="column" spacing={5}>
                                        {
                                            lotsList.map((lot, i) => {
                                                return (
                                                    <Grid key={i} item container direction="column" spacing={1}>
                                                        <Grid item container alignItems="center" spacing={1}>
                                                            <Grid item><p className={classes.title}>Lot</p></Grid>
                                                            <Grid xs item container>
                                                                <TextField
                                                                    className={classes.text}
                                                                    variant="outlined"
                                                                    value={apartNumber[i]}
                                                                    onChange={(event) => handleChangeApartNumber(event, i)}
                                                                    style={{ width: 100 }}
                                                                    type="number"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item><p className={classes.title}>Clefs de répartition du lot</p></Grid>

                                                        <Grid item container direction="column" spacing={1} >
                                                            {
                                                                lot.map((vote1, j) => {
                                                                    return (
                                                                        <Grid key={j} item container alignItems="center" spacing={1}>
                                                                            <Grid item><p className={classes.title}>{vote1.name}</p></Grid>
                                                                            <Grid item >
                                                                                <TextField
                                                                                    className={classes.text}
                                                                                    variant="outlined"
                                                                                    value={voteAmount[i][j]}
                                                                                    onChange={(event) => handleChangeVoteAmount(event, i, j)}
                                                                                    style={{ width: 100 }}
                                                                                    type="number"
                                                                                />
                                                                            </Grid>
                                                                            <Grid item><p className={classes.title}>tantièmes</p></Grid>
                                                                        </Grid>
                                                                    )
                                                                })
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                : null
                            }
                        </Grid>
                        <Grid item style={{ marginTop: 10, marginBottom: 10 }}>
                            <MyButton name={"Ajouter un lot"} bgColor="grey" onClick={handleClickAddLots} />
                        </Grid>
                    </Grid>
                    <Grid xs={12} item container direction="column" style={{ marginTop: 30 }}>
                        <p className={classes.title}>Pièce d'identité</p>
                        <Grid item container justify="flex-start">
                            <IdCard
                                onClose={handleClickCloseIdcard}
                                idcardurls={idcardurls}
                                state={state}
                            />

                            <input className={classes.input} type="file" id="img_idcard" onChange={handleLoadIdcard} />
                            <label htmlFor="img_idcard">
                                {
                                    <div className={classes.img}>
                                        <AddCircleOutlineIcon className={classes.plus} />
                                    </div>
                                }
                            </label>
                        </Grid>
                    </Grid>
                </Grid>
                <div className={classes.footer}>
                    <Grid container justify="space-between">
                        <MyButton name={"Créer"} color={"1"} onClick={handleCreate} />
                        <MyButton name={"Annuler"} bgColor="grey" onClick={handleClose} />
                    </Grid>
                </div>
            </div>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
        </div>

    );
};

export default AddOwner;
