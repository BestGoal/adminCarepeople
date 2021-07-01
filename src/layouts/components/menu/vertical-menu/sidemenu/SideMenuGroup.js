import React from "react"
import { Link } from "react-router-dom"
import { Badge } from "reactstrap"
import classnames from "classnames"
import { ChevronRight } from "react-feather"
import * as FaIcon from 'react-icons/fa'

class SideMenuGroup extends React.Component {
  constructor(props) {
    super(props)
    this.flag = true
    this.parentArray = []
    this.childObj = {}
  }

  state = {
    isOpen: false,
  }

  renderChild(item, activeGroup, handleGroupClick, handleActiveItem, parent) {
    return (
      <ul className="menu-content">
        {item.children ? item.children.map(child => {
          let Tag = FaIcon[child.icon];
          // let Tag = "fff";
            return (
              <li key={child.id}
                className={classnames( {
                  hover: this.props.hoverIndex === child.id,
                  "has-sub": child.type === "collapse",
                  open: child.type === "collapse" && activeGroup.includes(child.id),
                  active: this.props.activeItemState === child.id && child.type === "item",
                  disabled: child.disabled
                })}
                onClick={e => {
                  e.stopPropagation()
                  handleGroupClick(child.id, item.id, child.type)
                  if ( this.props.deviceWidth <= 1200 && child.type === "item" ) {
                    this.props.toggleMenu()
                  }
                }}>
                <Link
                  className={classnames({ "d-flex justify-content-between": child.type === "collapse" })}
                  to={ child.navLink && child.type === "item" ? child.navLink: ""                       }
                  href={""}
                  onMouseEnter={() => { this.props.handleSidebarMouseEnter(child.id) }}
                  onMouseLeave={() => { this.props.handleSidebarMouseEnter(child.id) }}
                  key={child.id}
                  onClick={e => { return child.type === "collapse" ? e.preventDefault(): "" }}
                  target={undefined}>
                  <div className="menu-text">
                    <Tag />
                    <span className="menu-item menu-title">
                      {child.title}
                    </span>
                  </div>
                  {child.badge ? ( <Badge color={child.badge} className="float-right mr-2" pill> {child.badgeText} </Badge> ): ( "" )}
                  {child.type === "collapse" ? ( <ChevronRight className="menu-toggle-icon" size={13} /> ): ( "" )} 
                </Link>
                {child.children && child.children.length > 0 ? this.renderChild( child, activeGroup, handleGroupClick, handleActiveItem, item.id ): ""}
              </li>
            ) 
        })
       : null}
      </ul>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderChild(
          this.props.group,
          this.props.activeGroup,
          this.props.handleGroupClick,
          this.props.handleActiveItem,
          null
        )}
      </React.Fragment>
    )
  }
}
export default SideMenuGroup
