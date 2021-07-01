import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import { Disc, X, Circle } from "react-feather"
import classnames from "classnames" 
import { connect } from "react-redux"
import { Root } from "../../../../authServices/rootconfig"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

class SidebarHeader extends Component {
  state={
    usersRole: "",
    fpImgUrl: ""
  }

  render() {
    let { toggleSidebarMenu, activeTheme, collapsed, toggle, sidebarVisibility, menuShadow }  = this.props;
    return (
      <div className="navbar-header">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item mr-auto">
            <NavLink to="/" className="navbar-brand">
              <div style={{backgroundPosition:'none !important',backgroundSize:"100% !important"}} >  
                <LazyLoadImage alt='' style={{width:'167px', height:'65px'}} effect="blur" src ={Root.imageurl + "logo/logo.png"}/>
              </div>
            </NavLink>
          </li>
          <li className="nav-item nav-toggle">
            <div className="nav-link modern-nav-toggle">
              {collapsed === false ? (
                <Disc
                  onClick={() => {
                    toggleSidebarMenu(true)
                    toggle()
                  }}
                  className={classnames(
                    "toggle-icon icon-x d-none d-xl-block font-medium-4",
                    {
                      "text-primary": activeTheme === "primary",
                      "text-success": activeTheme === "success",
                      "text-danger": activeTheme === "danger",
                      "text-info": activeTheme === "info",
                      "text-warning": activeTheme === "warning",
                      "text-dark": activeTheme === "dark"
                    }
                  )}
                  size={20}
                  data-tour="toggle-icon"
                />
              ): (
                <Circle
                  onClick={() => {
                    toggleSidebarMenu(false)
                    toggle()
                  }}
                  className={classnames(
                    "toggle-icon icon-x d-none d-xl-block font-medium-4",
                    {
                      "text-primary": activeTheme === "primary",
                      "text-success": activeTheme === "success",
                      "text-danger": activeTheme === "danger",
                      "text-info": activeTheme === "info",
                      "text-warning": activeTheme === "warning",
                      "text-dark": activeTheme === "dark"
                    }
                  )}
                  size={20}
                />
              )}
              <X
                onClick={sidebarVisibility}
                className={classnames(
                  "toggle-icon icon-x d-block d-xl-none font-medium-4",
                  {
                    "text-primary": activeTheme === "primary",
                    "text-success": activeTheme === "success",
                    "text-danger": activeTheme === "danger",
                    "text-info": activeTheme === "info",
                    "text-warning": activeTheme === "warning",
                    "text-dark": activeTheme === "dark"
                  }
                )}
                size={20}
              />
            </div>
          </li>
        </ul>
        <div className="text-center">
        </div>
        <div
          className={classnames("shadow-bottom", {
            "d-none": menuShadow === false
          })}
        />
      </div>
    )
  }
}

const mapstops = (state)=>{
  return {
  }
}

export default connect(mapstops,{})(SidebarHeader)