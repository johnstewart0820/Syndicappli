import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import 'bootstrap/dist/css/bootstrap.min.css';

const animatedComponents = makeAnimated();



const Multiselect = (props)=> {
    const [suggestions, setSuggestions] = React.useState(props.all);
    const [tags, setTags] = React.useState(props.selected);
    const handleChange = (value)=>{
      props.onSelected(value);
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Select 
              options={suggestions} 
              defaultValue={tags}
              components={animatedComponents} 
              placeholder={props.hint}
              onChange={handleChange}
              isDisabled={props.disabled == 'disabled'? true : null}
              isMulti />
          </div>
        </div>
      </div>
    );
}

export default Multiselect