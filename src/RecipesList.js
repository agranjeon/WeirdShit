import React from 'react';
import Recipe from './Recipe';
import RecipeForm from './RecipeForm';
import uuid from 'react-uuid';
import _ from 'lodash';
import {
  Container,
  Button,
  Flex,
  Margin
} from 'uikit-react';

export default class RecipesList extends React.Component {
  constructor(props) {
    super(props);
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    if (!recipes) {
      recipes = [];
    }
    this.state = {
        recipes: recipes,
        formOpen: false,
        formKey: uuid(),
        editedRecipe: undefined,
        randomShit: undefined,
    };
  }

  submitRecipe = (recipe) => {
    this.setState({formOpen: false, editedRecipe: null})
    if (!recipe.id) {
      recipe.id = uuid();
      let recipes = this.state.recipes;
      recipes.push(recipe);
      this.setState({recipes: recipes}, this.saveStateToLocalStorage)
      
      return;
    }

    let editedIndex = 0;
    this.state.recipes.find((r, index) => {
        editedIndex = index;
        return r.id === recipe.id
    })

    
    let recipes = this.state.recipes;
    recipes[editedIndex] = recipe;
    this.setState({recipes: recipes}, this.saveStateToLocalStorage)
  }

  openForm = () => {
    this.setState({formOpen: true, formKey: uuid()});
  }

  editRecipe = (recipe) => {
    this.setState({formOpen: true, formKey: uuid(), editedRecipe: recipe})
  }

  saveStateToLocalStorage = () => {
    localStorage.setItem('recipes', JSON.stringify(this.state.recipes))
  }

  deleteRecipe = (recipe) => {
    let editedIndex;
    this.state.recipes.find((r, index) => {
        editedIndex = index;
        return r.id === recipe.id
    })

    
    let recipes = this.state.recipes;
    recipes.splice(editedIndex, 1);
    this.setState({recipes: recipes}, this.saveStateToLocalStorage)
  }

  highlightRandomShit = () => {
    let randomShit = _.sample(this.state.recipes);

    this.setState({randomShit: randomShit})
  }

  render() {
    return (
      <Container size="expand" background="muted">
        <div class="yep">
          <Flex alignment="center">
            <Button onClick={this.highlightRandomShit}>RANDOM SHIT</Button>
            <Button onClick={() => this.openForm()}>Ajouter une recette</Button>
          </Flex>
          <Flex alignment="center">
            {this.state.randomShit &&
              <div class="random-shit">
                <Recipe recipe={this.state.randomShit} editRecipe={() => this.editRecipe(this.state.randomShit)} deleteRecipe={() => this.deleteRecipe(this.state.randomShit)} />
              </div>
            }
            <RecipeForm close={() => this.setState({formOpen: false})} key={this.state.formKey} isOpen={this.state.formOpen} editedRecipe={this.state.editedRecipe} onSubmit={this.submitRecipe}/>
          </Flex>
        
          <div class="recipes">
            <Flex wrap="wrap">
              {this.state.recipes.map((recipe, i) => {
                return (<Recipe recipe={recipe} key={i} highlightedShit={this.state.highlightedShit} editRecipe={() => this.editRecipe(recipe)} deleteRecipe={() => this.deleteRecipe(recipe)} />)
              })}
            </Flex>
          </div>
        </div>
      </Container>
    );
  }
}