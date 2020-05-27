import React, {Component} from 'react'


export default class Install extends Component {

    componentDidMount() {
        let deferredPrompt;   
        var banner = document.querySelector('#banner');
    
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            console.log('beforeinstallprompt fired! ^_^');
            deferredPrompt = e;
            return false;
        })
    
        banner.addEventListener('click', () => {
          if (deferredPrompt !== undefined) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((result) => {
              if (result.outcome == 'dismissed') {
                console.log('cancelled');
              }
    
              else {
                console.log('added to homescreen');
              }
              deferredPrompt = null;
            })
    
          }
        })
    
      }

    render() {
        return (
                <div>
                    <div>
                        <button id="banner">
                            نصب اپلیکیشن پربار
                        </button>

                    </div>
                </div>
        )
    }


}