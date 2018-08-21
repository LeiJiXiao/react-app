/**
 * Created by xiao on 2018/4/18.
 */
import React, { Component } from 'react';

import '@/sass/slide.css';

export default class SlideValid extends Component {
    state = {
        success: false,
        $box: '',
        $bg: '',
        $text: '',
        btn: '',
        distance: 0
    };
    selectNode() {
        this.setState({
            $box: this.refs['drag'],
            $bg: this.refs['bg'],
            $text: this.refs['text'],
            $btn: this.refs['btn'],
            distance: this.refs['drag'].offsetWidth - this.refs['btn'].offsetWidth
        });
    };
    slideHandler = event => {
        const { $bg, $text, $btn, distance } = this.state;

        $btn.style.transition = "";
        $bg.style.transition = "";

        const e = event || window.event;
        const downX = e.clientX;

        document.onmousemove = event => {
            const e = event || window.event;
            const moveX = e.clientX;
            let offsetX = moveX - downX;

            if ( offsetX > distance) {
                offsetX = distance;
            } else if ( offsetX < 0) {
                offsetX = 0;
            }

            $btn.style.left = offsetX + "px";
            $bg.style.width = offsetX + "px";

            if ( offsetX === distance) {
                /*$text.style.color = "#fff";
                $btn.style.color = "green";
                $bg.style.backgroundColor = "lightgreen";*/

                this.setState({
                    success: true
                });
                $btn.onmousedown = null;
                document.onmousemove = null;

                this.props.checkSlideValidHandler(this.state.success);
            }
        };

        document.onmouseup = e => {
            if (!this.state.success) {
                $btn.style.left = 0;
                $bg.style.width = 0;
                $btn.style.transition = "left 1s ease";
                $bg.style.transition = "width 1s ease";
            }
            document.onmousemove = null;
            document.onmouseup = null;
        }
    };
    componentDidMount() {
        this.selectNode();
    }
    render() {
        const success = this.state.success;
        return (
            <div>
                <div className="drag" ref="drag">
                    <div className={['bg', success? 'bgAct' : null].join(' ')} ref="bg"></div>
                    <div className={['text', success? 'textAct' : null].join(' ')} ref="text">
                        {success? '验证通过' : '请拖动滑块解锁'}
                    </div>
                    <div className={['btn', success? 'btnAct' : null].join(' ')} ref="btn" onMouseDown={this.slideHandler}>
                        {success? '&radic;' : '&gt;&gt;'}
                    </div>
                </div>
            </div>
        )
    }
}