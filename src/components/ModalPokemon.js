import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

function ModalPokemon(props) {
    const [pokemon, setPokemon] = useState([]);
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [pokemonAbilities, setPokemonAbilities] = useState([]);
    useEffect(() => {
        if (props.namePokemon != "") {
            getSpecsPokemon(props.namePokemon);
        }
    }, [props.namePokemon]);

    const getSpecsPokemon = (pokemon) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(result => result.json())
            .then(items => {
                setPokemon(items);
                setPokemonTypes(items.types);
                setPokemonAbilities(items.abilities);
            })
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: '600px',
            backgroundColor: theme.palette.background.paper,
            top: '30%',
            left: '30%',
            boxShadow: theme.shadows[5],
            display: 'flex'
        },
    }));
    const classes = useStyles();
    const handleClose = () => {
        props.closeModal();
    };
    const isEmpty = (sIn) => { return sIn ? false : true; }
    return (
        <>
            <div className="modalPokemon">
                <Modal
                    open={props.openModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    onClose={handleClose}
                >
                    <div className={classes.paper}>
                        <Grid item xs={6} sm={6} lg={6}>
                            <div>
                                <h2 id="simple-modal-title">{props.namePokemon}</h2>
                                <img src={`img/pokemons/${props.namePokemon}.jpg`}></img>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={6} lg={6}>
                            <div className="pokemonSizeFather">
                                <span className="pokemonSizeSon"><strong>Height</strong><span>{pokemon.height} ft</span></span>
                                <span className="pokemonSizeSon"><strong>Weight</strong><span>{pokemon.weight} lb</span></span>
                            </div>
                            <strong>Type</strong>
                            {!isEmpty(pokemonTypes) ? <div className="typesPokemons">
                                {pokemonTypes.map((item) => {
                                    return (
                                        <div className="tagsPokemon">{item.type.name}</div>
                                    )
                                })}
                            </div> : null}
                            <strong>abilities</strong>
                            {!isEmpty(pokemonAbilities) ? <div className="typesPokemons">
                                {pokemonAbilities.map((item) => {
                                    return (
                                        <div className="tagsPokemon">{item.ability.name}</div>
                                    )
                                })}
                            </div> : null}
                        </Grid>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default ModalPokemon;