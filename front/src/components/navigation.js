import React, { Component } from 'react'
import { Button, Menu, Icon, Modal, Input } from 'semantic-ui-react'

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
            <Modal.Header>ورود به سامانه</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <p>
                  <Input icon='user' iconPosition='right' placeholder='نام کاربری' />
                </p>
                <p>
                  <Input icon='key' iconPosition='right' placeholder='رمز عبور' type="password" />
                </p>
                <p>
                  <Button animated primary>
                    <Button.Content visible>
                      ورود
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name='arrow left' />
                    </Button.Content>
                  </Button>
                </p>
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