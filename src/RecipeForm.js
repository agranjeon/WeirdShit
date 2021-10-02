import React from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormLabel, Input, Textarea } from 'uikit-react';

export default class RecipeForm extends React.Component {
  constructor (props) {
    super(props)

    let editedRecipe = this.props.editedRecipe;

    this.state = {
      id: editedRecipe ? editedRecipe.id : '',
      title: editedRecipe ? editedRecipe.title : '',
      informations: editedRecipe ? editedRecipe.informations ?? '' : '',
      link: editedRecipe ? editedRecipe.link ?? '' : '',
      ingredients: editedRecipe ? editedRecipe.ingredients ?? '' : '',
    }

  }
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.onSubmit(this.state);
    }
  }

  render() {
    if (this.props.isOpen === true) {
      return (
        <div class="shit-form">
          <Card>
            <CardHeader>
              <CardTitle>Recette</CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <input type="hidden" name="id" value={this.state.id}/>
                <FormLabel htmlFor="title">Nom de la recette</FormLabel>
                <Input id="title" name="title" onChange={this.handleChange} value={this.state.title} onKeyPress={this.handleKeyPress}/>
                <FormLabel htmlFor="informations">Informations</FormLabel>
                <Input id="informations" name="informations" onChange={this.handleChange} value={this.state.informations} onKeyPress={this.handleKeyPress}/>
                <FormLabel htmlFor="link">Lien</FormLabel>
                <Input id="link" name="link" onChange={this.handleChange} value={this.state.link} onKeyPress={this.handleKeyPress}/>
                <FormLabel htmlFor="ingredients">Ingredients</FormLabel>
                <Textarea id="ingredients" name="ingredients" onChange={this.handleChange} onKeyPress={this.handleKeyPress}>{this.state.ingredients}</Textarea>
                <Button onClick={() => this.props.onSubmit(this.state)}>Enregistrer</Button>  
              </Form>
            </CardBody>
          </Card>
        </div>
      )
    }

    return '';
  }
}