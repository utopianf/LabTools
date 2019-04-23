describe("Sample List", () => {
   furnace = {
       "name": "test furnace",
        "location": "test location",
        "comment": null
   };
    furnace_sequence = {
        "furnace": 1,
        "comment": null
    };
    furnace_step1 = {
        "furnace_sequence": 1,
        "order": 1,
        "start_temperature": 20,
        "end_temperature": 800,
        "duration": "02:00:00",
        "comment": null
    };
    furnace_step2 = {
        "furnace_sequence": 1,
        "order": 2,
        "start_temperature": 800,
        "end_temperature": 800,
        "duration": "10:00:00",
        "comment": null
    };
    furnace_step3 = {
        "furnace_sequence": 1,
        "order": 3,
        "start_temperature": 800,
        "end_temperature": 20,
        "duration": "02:00:00",
        "comment": null
    };
    chemical_substance1 = {
        "chem_formula": "SrTiO<sub>3</sub>",
        "abbreviation": "STO"
    };
    chemical_substance2 = {
        "chem_formula": "Fe<sub>2</sub>Mo<sub>3</sub>O<sub>8</sub>",
        "abbreviation": "FMO"
    };
    target = {
        "syn_date": "2019-04-23T03:48:59.764Z",
        "chemical_substance": 2,
        "furnace_sequence": 1,
        "comment": null
    };
    batch = {
        "fab_date": "2019-04-23T03:48:35.498Z",
        "pld": 0,
        "laser_energy": 20.0,
        "background_pressure": 1e-07,
        "atmosphere_gas": "Ar",
        "atmosphere_pressure": 0.01,
        "comment": null
    };
    batch_step = {
        "batch": 1,
        "order": 1,
        "target": 1,
        "temperature": 780.0,
        "pulse_num": 7200,
        "duration": "02:00:00"
    };
    substrate = {
        "chemical_substance": 1,
        "orientation": "111",
        "comment": null
    };
    sample = {
        "batch": 1,
        "substrate": 1,
        "sub_size": "5*5",
        "is_masked": false,
        "comment": null
    };

    before(() => {
        cy.exec("npm run dev");
        cy.exec("npm run flush");
    });

    it("should be able to fill a web form", () => {
        cy.visit("/");

        cy
            .get('input[name="name"]')
            .type(furnace.name)
            .should("have.value", furnace.name);

        cy
            .get('input[name="location"]')
            .type(furnace.location)
            .should("have.value", furnace.location);

        cy
            .get('input[name="comment"]')
            .type(furnace.comment)
            .should("have.value", furnace.comment);

        cy.get("form").submit();
    });

    it("should be able to see the table")

});