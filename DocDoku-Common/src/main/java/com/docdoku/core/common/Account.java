/*
 * DocDoku, Professional Open Source
 * Copyright 2006, 2007, 2008, 2009, 2010 DocDoku SARL
 *
 * This file is part of DocDoku.
 *
 * DocDoku is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DocDoku is distributed in the hope that it will be useful,  
 * but WITHOUT ANY WARRANTY; without even the implied warranty of  
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the  
 * GNU General Public License for more details.  
 *  
 * You should have received a copy of the GNU General Public License  
 * along with DocDoku.  If not, see <http://www.gnu.org/licenses/>.  
 */

package com.docdoku.core.common;

import java.io.Serializable;
import java.util.*;

/**
 * The <code>Account</code> class represents a user of the application
 * but not attached to a particular workspace.
 * 
 * @author Florent GARIN
 * @version 1.0, 02/06/08
 * @since   V1.0
 */
@javax.persistence.Entity
public class Account implements Serializable, Cloneable {

    @javax.persistence.Id
    private String login="";
    
    private String name;
    private String email;
    private String language;
    
  
    @javax.persistence.Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date creationDate;

    public Account(){

    }
    

    public Account(String pLogin, String pName, String pEmail, String pLanguage, Date pCreationDate) {
        login = pLogin;
        name = pName;
        email = pEmail;
        language = pLanguage;
        creationDate = pCreationDate;
    }

    
    public String getLogin() {
        return login;
    }

    public void setLogin(String pLogin) {
        login=pLogin;
    }

    public String getName() {
        return name;
    }

    public void setName(String pName) {
        name = pName;
    }

    public void setEmail(String pEmail) {
        email = pEmail;
    }

    public String getEmail() {
        return email;
    }
    
    public void setLanguage(String pLanguage) {
        language = pLanguage;
    }

    public String getLanguage() {
        return language;
    }

    @Override
    public String toString() {
        return login;
    }

    public void setCreationDate(Date pCreationDate) {
        creationDate = pCreationDate;
    }

    public Date getCreationDate() {
        return creationDate;
    }
    

    @Override
    public boolean equals(Object pObj) {
        if (this == pObj) {
            return true;
        }
        if (!(pObj instanceof Account))
            return false;
        Account account = (Account) pObj;
        return account.login.equals(login);
    }

    @Override
    public int hashCode() {
        return login.hashCode();
    }

    /**
     * perform a deep clone operation
     */
    @Override
    public Account clone() {
        Account clone = null;
        try {
            clone = (Account) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new InternalError();
        }
        clone.creationDate = (Date) creationDate.clone();
        return clone;
    }
}