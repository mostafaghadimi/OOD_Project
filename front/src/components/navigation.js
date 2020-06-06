import React, { Component } from 'react'
import { Button, Menu, Icon, Modal, Header } from 'semantic-ui-react'

export default class Navbar extends Component {
  state = { activeItem: 'خانه' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu size='large'>

          <Menu.Item>
          <Modal trigger={
              <Button animated primary>
              <Button.Content visible>
                ورود
              </Button.Content>
              <Button.Content hidden>
                <Icon name='arrow left' />
              </Button.Content>
            </Button>
          }>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Header>Default Profile Image</Header>
                <p>
                  We've found the following gravatar image associated with your e-mail
                  address.
                </p>
                <p>Is it okay to use this photo?</p>
              </Modal.Description>
            </Modal.Content>
          </Modal>
            
          </Menu.Item>

          <Menu.Item>
            <Button animated='vertical' color="green">
              <Button.Content visible>
                ثبت‌نام
              </Button.Content>
              <Button.Content hidden>
                <Icon name='plus'/>
              </Button.Content>
            </Button>
          </Menu.Item>

        <Menu.Menu position='right'>
          
            <Menu.Item
              name='درباره ما'
              active={activeItem === 'درباره ما'}
              onClick={this.handleItemClick}
            />

            <Menu.Item
              name='خانه'
              active={activeItem === 'خانه'}
              onClick={this.handleItemClick}
            />
           
          </Menu.Menu>
      </Menu>
    )
  }
}