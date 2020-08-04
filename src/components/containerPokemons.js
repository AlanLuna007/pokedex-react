import React, { useEffect, useState } from 'react';
import ModalPokemon from './ModalPokemon';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function ContainerPokemons() {
    const [itemsPokemons, setItemsPokemons] = useState([]);
    const [themePokemons, setThemePokemons] = useState([]);
    const [namePokemon, setNamePokemon] = useState("");
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        getPokemonsName();
    }, []);

    const getPokemonsName = () => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
            .then(result => result.json())
            .then(items => {
                setItemsPokemons(items.results.slice(0, 20));
                setThemePokemons(items.results);
            })
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            display: 'inline-grid',
            width: '200px',
            height: '200px',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }));
    const classes = useStyles();

    const isEmpty = (sIn) => { return sIn ? false : true; }

    const closeModal = () => {
        setOpenModal(false);
    }
    return (
        <>
            {isEmpty(itemsPokemons) ? <h1>Cargando ...</h1> :
                <div>
                    <Input
                        className="inputSearchPokemon"
                        id="free-solo-demo"
                        placeholder="Buscar Pokemon"
                        onChange={(value) => {
                            let arrPokemon = [];
                            arrPokemon = themePokemons.filter((item) => {
                                return (item.name.includes(value.target.value))
                            })
                            setItemsPokemons(arrPokemon);
                        }}
                    />
                    <Grid container spacing={3}>
                        {itemsPokemons.slice(0, 20).map((item) => {
                            return (<Grid item xs={12} sm={3} lg={2} className="pokemonCard">
                                <Paper className={classes.paper} onClick={() => {
                                    setNamePokemon(item.name);
                                    setOpenModal(true);
                                }}>
                                    <img src={`img/pokemons/${item.name}.jpg`}></img>
                                    {item.name}
                                </Paper>
                            </Grid>)
                        })}
                    </Grid>
                </div>}
            <ModalPokemon namePokemon={namePokemon} openModal={openModal} closeModal={closeModal} />
        </>
    );
}

export default ContainerPokemons;