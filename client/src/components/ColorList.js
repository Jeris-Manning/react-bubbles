import React, { useState } from 'react';
import { axiosAuthenticate } from '../utility/axiosAuthenticate';

const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    axiosAuthenticate()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log(res, 'return value from edit color PUT');
        setEditing(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteColor = (color) => {
    console.log(color, "'color' props passed into deleteColor function");
    axiosAuthenticate()
      .delete(`/colors/${color.id}`)
      .then((res) => {
        console.log(res, 'return value from deleteColor');
        
      })
      .catch((err) => console.log(err));
  };

  const addColor = (e) => {
    e.preventDefault();
    if(newColor.color!=initialColor.color && newColor.code != initialColor.code){
    console.log(newColor, "'color' props passed into addColor function");
    axiosAuthenticate()
      .post(`/colors`, newColor)
      .then((res) => {
        console.log(res, 'return value from addColor post');
        setNewColor(initialColor);
      });
  }};

  return (
    <div className='colors-wrap'>
      <p>COLORS</p>
      <ul>
        {colors.map((color) => (
          <div className='color-action'>
            <span className='delete' onClick={() => deleteColor(color)}>
              X
            </span>
            <li key={color.color} onClick={() => editColor(color)}>
              <span> {color.color}</span>
              <div
                className='color-box'
                style={{ backgroundColor: color.code.hex }}
              />
            </li>
          </div>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>EDIT COLOR</legend>
          <label>
            Color Name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            Hex Code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <form onSubmit={addColor}>
        <legend>ADD A COLOR</legend>

        <label>
          Color Name:
          <input
            onChange={(e) =>
              setNewColor({ ...newColor, color: e.target.value })
            }
            value={newColor.color}
          />
        </label>

        <label>
          Hex Code:
          <input
            onChange={(e) =>
              setNewColor({ ...newColor, code: { hex: e.target.value } })
            }
            value={newColor.code.hex}
          />
        </label>
        <div className='button-row'>
          <button type='submit'>Add Color</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEditing(false);
            }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
