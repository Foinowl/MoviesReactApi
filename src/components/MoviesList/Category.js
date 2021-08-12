import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setSelectedMenu } from '../../actions';
import NotFound from '../NotFound';
import styled from 'styled-components';

const Category = ({ match}) => {
  useSetSelected(match.params.name, setSelectedMenu);
  return <div>{match.params.name}</div>;
};


function useSetSelected(name, cb) {
	const dispatch = useDispatch()
  useEffect(() => {
    dispatch(cb(name))
  }, [name]);
}

export default Category