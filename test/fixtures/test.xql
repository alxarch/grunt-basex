declare variable $test external;
(
	if($test = 'test') then 'ok' else 'notok',
	if(ends-with(document-uri(.), 'test/fixtures/test.xml')) then 'ok' else 'notok',
	if(db:system()/options/createfilter = '*.xml,*.xxx') then 'ok' else 'notok'
)