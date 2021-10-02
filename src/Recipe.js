import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Margin} from 'uikit-react'

export default class Recipe extends React.Component {
  render() {
    console.log(this.props.recipe.ingredients)
    let body = '<div class="display-linebreak">' + this.props.recipe.ingredients + '</div>'
    if (this.props.recipe.link) {
      body += '<a href="' + this.props.recipe.link + '" target="_blank">Link</a>';
    }
    body += '<div>' + this.props.recipe.informations + '</div>';
    return (
      <Card class="recipe">
        <CardHeader>
          <CardTitle>{this.props.recipe.title}</CardTitle>
        </CardHeader>
        <CardBody>
          <div dangerouslySetInnerHTML={{__html: body}}>

          </div>
        </CardBody>
        <CardFooter>
          <Button onClick={() => this.props.editRecipe()} class="uk-margin">Modifier</Button>
          <Button onClick={() => this.props.deleteRecipe()} class="uk-margin">SUPPRIMER</Button>
        </CardFooter>
      </Card>
      );
  }
}