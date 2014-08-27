MPS.factory(
    'bioactivities_heatmap_filter', function ($http) {
        'use strict';

        function get_all_bioactivities_keys(resource_url) {
            var i;
            var result = [];

            $http({method: 'GET', url: resource_url}).
                success(
                    function (data) {
                        var MINIMUM_FEATS_COUNT = 10;
                        var max_length = data.length;
                        for (i = 0; i < max_length; i += 1) {

                            if (data[i][1] >= MINIMUM_FEATS_COUNT) {
                                result.push(
                                    {name: data[i][0], is_selected: false}
                                );
                            }
                        }
                    }
                ).error(
                    function () {
                        alert('Error fetching data from server.');
                    }
                );
            return result;
        }

        var target_types = [
            {name: 'Cell Line', is_selected: false},
            {name: 'Organism', is_selected: false},
            {name: 'Single Protein', is_selected: false},
            {name: 'Tissue', is_selected: false}
        ];
        var organisms = [
            {name: 'Homo Sapiens', is_selected: false},
            {name: 'Rattus Norvegicus', is_selected: false},
            {name: 'Canis Lupus Familiaris', is_selected: false}
        ];

        var compounds = get_all_bioactivities_keys('/bioactivities/all_compounds');
        var bioactivities = get_all_bioactivities_keys('/bioactivities/all_bioactivities');
        var targets = get_all_bioactivities_keys('/bioactivities/all_targets');

        return {
            // expose the private `targets` variable
            // as a public variable of the same name
            targets: targets,

            // expose the private `compounds` variable
            // as a public variable of the same name
            compounds: compounds,

            // expose the private `bioactivities` variable
            // as a public variable of the same name
            bioactivities: bioactivities,

            target_types: target_types,

            organisms: organisms
        };

    }
);
