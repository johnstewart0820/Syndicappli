import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const Multiselect = (props)=> {
    const [suggestions, setSuggestions] = React.useState(props.all);
    const [tags, setTags] = React.useState(props.selected);
    const handleChange = (value)=>{
      props.onSelected(value);
    }
    return (
      <div style={{width: '80%'}}>
        <Select 
          options={suggestions} 
          defaultValue={tags}
          components={animatedComponents} 
          placeholder={props.hint}
          onChange={handleChange}
          isDisabled={props.disabled === 'disabled'? true : null}
          isMulti />
      </div>
    );
}

export default Multiselect