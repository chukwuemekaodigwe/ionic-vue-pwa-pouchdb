<template>
    <div>
        <!-- tooltip block -->
        <div class="tooltip" data-direction="bottom">
            <div class="tooltip__initiator">
                <!-- element with tooltip hover call -->
                <i class="fa fa-info-circle">i</i>
            </div>
            <div class="tooltip__item">
                Hello! I'm a pure css tooltip
            </div>
        </div>

        <!-- tooltip block -->
        <div class="tooltip" data-direction="right">
            <div class="tooltip__initiator">
                <!-- element with tooltip hover call -->
                <i class="fa fa-info-circle">i</i>
            </div>
            <div class="tooltip__item">
                Hello! I'm a pure css tooltip
            </div>
        </div>

        <div class="icon-box">
	<div class="icon icon__danger">
		<div class="tooltip tooltip__dang">
			This is DANGER tooltip!
		</div>
		<svg viewBox="0 0 24 24">
  <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M13,17H11V15H13V17M13,13H11V7H13V13Z"></path>
</svg>
	</div>
	<div class="icon icon__src">
		<div class="tooltip tooltip__src">
			This is DANG... no no no! &#9786 tooltip!
		</div>
		<svg  viewBox="0 0 24 24">
  <path d="M11.83,1.73C8.43,1.79 6.23,3.32 6.23,3.32C5.95,3.5 5.88,3.91 6.07,4.19C6.27,4.5 6.66,4.55 6.96,4.34C6.96,4.34 11.27,1.15 17.46,4.38C17.75,4.55 18.14,4.45 18.31,4.15C18.5,3.85 18.37,3.47 18.03,3.28C16.36,2.4 14.78,1.96 13.36,1.8C12.83,1.74 12.32,1.72 11.83,1.73M12.22,4.34C6.26,4.26 3.41,9.05 3.41,9.05C3.22,9.34 3.3,9.72 3.58,9.91C3.87,10.1 4.26,10 4.5,9.68C4.5,9.68 6.92,5.5 12.2,5.59C17.5,5.66 19.82,9.65 19.82,9.65C20,9.94 20.38,10.04 20.68,9.87C21,9.69 21.07,9.31 20.9,9C20.9,9 18.15,4.42 12.22,4.34M11.5,6.82C9.82,6.94 8.21,7.55 7,8.56C4.62,10.53 3.1,14.14 4.77,19C4.88,19.33 5.24,19.5 5.57,19.39C5.89,19.28 6.07,18.92 5.95,18.6V18.6C4.41,14.13 5.78,11.2 7.8,9.5C9.77,7.89 13.25,7.5 15.84,9.1C17.11,9.9 18.1,11.28 18.6,12.64C19.11,14 19.08,15.32 18.67,15.94C18.25,16.59 17.4,16.83 16.65,16.64C15.9,16.45 15.29,15.91 15.26,14.77C15.23,13.06 13.89,12 12.5,11.84C11.16,11.68 9.61,12.4 9.21,14C8.45,16.92 10.36,21.07 14.78,22.45C15.11,22.55 15.46,22.37 15.57,22.04C15.67,21.71 15.5,21.35 15.15,21.25C11.32,20.06 9.87,16.43 10.42,14.29C10.66,13.33 11.5,13 12.38,13.08C13.25,13.18 14,13.7 14,14.79C14.05,16.43 15.12,17.54 16.34,17.85C17.56,18.16 18.97,17.77 19.72,16.62C20.5,15.45 20.37,13.8 19.78,12.21C19.18,10.61 18.07,9.03 16.5,8.04C14.96,7.08 13.19,6.7 11.5,6.82M11.86,9.25V9.26C10.08,9.32 8.3,10.24 7.28,12.18C5.96,14.67 6.56,17.21 7.44,19.04C8.33,20.88 9.54,22.1 9.54,22.1C9.78,22.35 10.17,22.35 10.42,22.11C10.67,21.87 10.67,21.5 10.43,21.23C10.43,21.23 9.36,20.13 8.57,18.5C7.78,16.87 7.3,14.81 8.38,12.77C9.5,10.67 11.5,10.16 13.26,10.67C15.04,11.19 16.53,12.74 16.5,15.03C16.46,15.38 16.71,15.68 17.06,15.7C17.4,15.73 17.7,15.47 17.73,15.06C17.79,12.2 15.87,10.13 13.61,9.47C13.04,9.31 12.45,9.23 11.86,9.25M12.08,14.25C11.73,14.26 11.46,14.55 11.47,14.89C11.47,14.89 11.5,16.37 12.31,17.8C13.15,19.23 14.93,20.59 18.03,20.3C18.37,20.28 18.64,20 18.62,19.64C18.6,19.29 18.3,19.03 17.91,19.06C15.19,19.31 14.04,18.28 13.39,17.17C12.74,16.07 12.72,14.88 12.72,14.88C12.72,14.53 12.44,14.25 12.08,14.25Z"></path>
</svg>
	</div>
	<div class="icon icon__cow">
		<div class="tooltip tooltip__cow">
			This is COW tooltip!
		</div>
		<svg viewBox="0 0 24 24">
  <path d="M10.5,18A0.5,0.5 0 0,1 11,18.5A0.5,0.5 0 0,1 10.5,19A0.5,0.5 0 0,1 10,18.5A0.5,0.5 0 0,1 10.5,18M13.5,18A0.5,0.5 0 0,1 14,18.5A0.5,0.5 0 0,1 13.5,19A0.5,0.5 0 0,1 13,18.5A0.5,0.5 0 0,1 13.5,18M10,11A1,1 0 0,1 11,12A1,1 0 0,1 10,13A1,1 0 0,1 9,12A1,1 0 0,1 10,11M14,11A1,1 0 0,1 15,12A1,1 0 0,1 14,13A1,1 0 0,1 13,12A1,1 0 0,1 14,11M18,18C18,20.21 15.31,22 12,22C8.69,22 6,20.21 6,18C6,17.1 6.45,16.27 7.2,15.6C6.45,14.6 6,13.35 6,12L6.12,10.78C5.58,10.93 4.93,10.93 4.4,10.78C3.38,10.5 1.84,9.35 2.07,8.55C2.3,7.75 4.21,7.6 5.23,7.9C5.82,8.07 6.45,8.5 6.82,8.96L7.39,8.15C6.79,7.05 7,4 10,3L9.91,3.14V3.14C9.63,3.58 8.91,4.97 9.67,6.47C10.39,6.17 11.17,6 12,6C12.83,6 13.61,6.17 14.33,6.47C15.09,4.97 14.37,3.58 14.09,3.14L14,3C17,4 17.21,7.05 16.61,8.15L17.18,8.96C17.55,8.5 18.18,8.07 18.77,7.9C19.79,7.6 21.7,7.75 21.93,8.55C22.16,9.35 20.62,10.5 19.6,10.78C19.07,10.93 18.42,10.93 17.88,10.78L18,12C18,13.35 17.55,14.6 16.8,15.6C17.55,16.27 18,17.1 18,18M12,16C9.79,16 8,16.9 8,18C8,19.1 9.79,20 12,20C14.21,20 16,19.1 16,18C16,16.9 14.21,16 12,16M12,14C13.12,14 14.17,14.21 15.07,14.56C15.65,13.87 16,13 16,12A4,4 0 0,0 12,8A4,4 0 0,0 8,12C8,13 8.35,13.87 8.93,14.56C9.83,14.21 10.88,14 12,14M14.09,3.14V3.14Z"></path>
</svg>
	</div>
</div>

    </div>
</template>

 <style scss>

/*.tooltip {
    position: relative;
}

.tooltip__item {
    position: absolute;
    min-width: 100px;
    padding: 20px;
    visibility: hidden;
    opacity: 0;
    background: white;
    transition: all 0.25s cubic-bezier(0, 0, 0.2, 1);
    color: #484848;
    border: 1px solid #cecece;
    border-radius: 3px;
    font-weight: 500;
    box-shadow: 0 2px 1px #bcbcbc;
    z-index: 4;
}

.tooltip__item:after {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
}

.tooltip__initiator {
    cursor: pointer;
    z-index: 5;
}

.tooltip[data-direction="left"] .tooltip__initiator:hover~.tooltip__item {
    transform: translate3d(0, -50%, 0);
    visibility: visible;
    opacity: 1;
}

.tooltip[data-direction="left"] .tooltip__item {
    top: 50%;
    right: calc(100% + 1em);
    transform: translate3d(15px, -50%, 0);
}

.tooltip[data-direction="left"] .tooltip__item:after {
    top: 50%;
    right: -0.5em;
    transform: translate3d(0, -50%, 0);
    border-width: 0.5em 0 0.5em 0.5em;
    border-color: transparent transparent transparent white;
    -webkit-filter: drop-shadow(1px 2px 1px #bcbcbc);
    filter: drop-shadow(1px 2px 1px #bcbcbc);
}

.tooltip[data-direction="bottom"] .tooltip__initiator:hover~.tooltip__item {
    transform: translate3d(-50%, 0, 0);
    visibility: visible;
    opacity: 1;
}

.tooltip[data-direction="bottom"] .tooltip__item {
    top: calc(100% + 1em);
    left: 50%;
    transform: translate3d(-50%, -15px, 0);
}

.tooltip[data-direction="bottom"] .tooltip__item:after {
    top: -0.5em;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    border-width: 0 0.5em 0.5em 0.5em;
    border-color: transparent transparent white transparent;
    -webkit-filter: drop-shadow(1px 2px 1px #bcbcbc);
    filter: drop-shadow(1px -1px 1px #bcbcbc);
}

.fa.fa-info-circle {
    font-size: 38px;
    color: #21606b; -->


}
*/

$danger: #D30423
$src: #0641AD
$cow: #BC6C62
html,
body
	margin: 0
	padding: 0
	box-sizing: border-box
	font-family: helvetica, sans-serif
.icon-box
	display: flex
	flex-direction: row
	width: 200px
	justify-content: space-around
	border: 1px solid #ddd
	padding: 1em
	border-radius: 4px
	position: absolute
	top: 50%
	left: 50%
	transform: translate(-50%, -50%)
.icon
	height: 24px
	width: 24px
	position: relative
	cursor: pointer
	svg
		transition: 0.3s ease
	&:hover .tooltip
		display: block
	&__danger
		&:hover svg
			fill: $danger
	&__src
		&:hover svg
			fill: $src
	&__cow
		&:hover svg
			fill: $cow
.tooltip
	padding: 10px
	position: absolute
	width: auto
	white-space: nowrap
	word-wrap: no-wrap
	box-shadow: 1px 1px 20px #aaa
	border-radius: 5px
	background-color: #fff
	top: 40px
	left: 50%
	transform: translate(-50%)
	transform-style: preserve-3d
	z-index: 200
	font-size: 0.9em
	display: none
	&:after
		content: ''
		position: absolute
		display: block
		width: 10px
		height: 10px
		transform-origin: 50% 50%
		transform: rotate(45deg) translateX(-50%)
		background-color: #fff
		left: 50%
		top: -1px
		z-index: 400
	&:before
		content: ''
		display: block
		position: absolute
		width: 10px
		height: 10px
		transform-origin: 50% 50%
		transform: rotate(45deg) translateX(-50%) translateZ(-1px)
		background-color: #fff
		left: 50%
		top: 0px
		z-index: -1
		box-shadow: -1px -1px 20px #aaa
	&__dang
		color: $danger
		box-shadow: 1px 1px 20px rgba($danger, 0.3)
	&__src
		color: $src
		box-shadow: 1px 1px 20px rgba($src, 0.3)
		top: -50px
		&:after
			top: auto
			bottom: -8px
		&:before
			top: auto
			bottom: -8px
	&__cow
		color: $cow
		box-shadow: 1px 1px 20px rgba($cow, 0.3)


</style>