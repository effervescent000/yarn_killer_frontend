describe("Auth tests", () => {
    it("Login in successfully", () => {
        const user = { username: "test_user", password: "ilovebutts" };

        cy.visit(`/`);
        cy.login(user.username, user.password);
        cy.wait(500);
        cy.getCookie("access_token_cookie").should("exist");
        cy.logout();
        cy.wait(500);
        cy.getCookie("access_token_cookie").should("not.exist");
        cy.get("username").should("not.exist");
    });
});
