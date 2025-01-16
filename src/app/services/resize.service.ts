import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ResizeService {
    public sizeScreen: number = 0;
    public sendSize = new EventEmitter<number>();
    resizeManagement() {
        window.onresize = () => {
            console.log("resize");
            this.sizeScreen = window.innerWidth;
            this.sendSize.emit(this.sizeScreen);
        }
    }
}